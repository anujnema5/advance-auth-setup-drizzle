import { Request, Response } from "express"
import { db } from "../db"
import { categories, postOnCategories, posts, profiles, users } from "../db/schema"
import { eq, isNotNull } from "drizzle-orm"
import { USERS } from "../fakerData"

export const getAllUsers = async (req: Request, res: Response) => {
    const allUsers = await db.select().from(users)
    return res.status(200).json(allUsers)
}

export const seedUsers = async (req: Request, res: Response) => {
    try {
        const seedUsers = USERS
        const seedUsersArr = await Promise.all(
            seedUsers.map(async (user: any) => {
                await db.transaction(async (trx) => {
                    await trx.insert(users).values(user)
                })
                return user
            })
        )

        res.status(200).json({ message: "Sucess Random Data created", data: seedUsersArr })

    } catch (error) {
        res.status(401).send({ message: "Some error occured", error: error })
    }
}

export const usersWithProfilesandPosts = async (req: Request, res: Response) => {
    const result = await db
        .select()
        .from(users)
        .innerJoin(profiles, eq(users.id, profiles.userId))
        .innerJoin(posts, eq(users.id, posts.authorId))

    res.status(200).json(result)
}

export const getProfiles = async (req: Request, res: Response) => {
    const result = await db
        .select()
        .from(users)
        .innerJoin(profiles, eq(users.id, profiles.userId))

    res.status(200).json(result);
}

export const createUser = async (req: Request, res: Response) => {
    const newUser = await db.insert(users).values({
        address: "street 1",
        fullName: "user 1",
        phone: "2842384923",
        city: "vidisha",
        country: "India",
    }).returning()

    return res.json(newUser)
}

export const createOnetoOne = async (req: Request, res: Response) => {
    const newUser = await db.insert(users).values({
        address: "street 1",
        fullName: "user 1",
        phone: "2842384923",
        city: "vidisha",
        country: "India",
    }).returning({ usersId: users.id })

    await db.insert(profiles).values({
        userId: newUser[0].usersId,
        bio: "I am a programmers",
    }).execute();

    const result = await db.query.users.findFirst({
        where: eq(users.id, newUser[0].usersId),
        with: {
            profile: true
        }
    })

    return res.json(result)
}

export const createOneToMany = async (req: Request, res: Response) => {
    const newUser = await db.insert(users).values({
        address: "street 4",
        fullName: "user 4",
        phone: "28423823",
        city: "basoda",
        country: "India",
    }).returning({ usersID: users.id });

    const userId = newUser[0].usersID;

    ["post 11", "post 22"].forEach(async post => {
        await db.insert(posts).values({
            authorId: userId,
            text: post
        }).execute();
    });

    const result = await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            posts: true
        }
    });

    res.status(200).json(result);
};

export const createManyToMany = async (req: Request, res: Response) => {
    const newUser = await db.insert(users).values({
        address: "street 5",
        fullName: "user 7",
        phone: "28423823",
        city: "bamori",
        country: "India",
    }).returning({ usersID: users.id });

    const userId = newUser[0].usersID;

    const newCats = await db.insert(categories)
        .values([
            { name: "cat 112" },
            { name: "cat 22" }
        ]).returning({ catId: categories.id });


    const newPosts = await db.insert(posts).values([
        { authorId: userId, text: "post 1222" },
        { authorId: userId, text: "post 22223" },
    ]).returning({ postId: posts.id })


    await db.insert(postOnCategories).values([
        {
            categoryId: newCats[0].catId, postId: newPosts[0].postId
        },

        {
            categoryId: newCats[0].catId, postId: newPosts[1].postId
        },

        {
            categoryId: newCats[1].catId,
            postId: newPosts[1].postId
        }
    ]).execute()


    const result = await db.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
            posts: {
                with: {
                    postCategories: {
                        columns: {
                            categoryId: false,
                            postId: false
                        },

                        with: {
                            category: {
                                columns: {
                                    name: true
                                }
                            },
                        }
                    }
                }
            }
        }
    });

    res.status(200).json(result);
};
