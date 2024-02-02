import { Request, Response } from "express";
import { db } from "../db";
import { categories, postOnCategories, posts } from "../db/schema";
import { eq } from "drizzle-orm";

export const postsWithCategory = async (req: Request, res: Response)=> {
    // const result = await db.select().from(posts).
    // innerJoin(postOnCategories, eq(postOnCategories.postId, posts.id)).
    // innerJoin(categories, eq(categories.id, postOnCategories.postId))
    // innerJoin()

    const result = await db.query.posts.findFirst({
        with: {
            author: true,
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
                    }
                }
            }
        }
    })

    res.status(200).json(result)
}