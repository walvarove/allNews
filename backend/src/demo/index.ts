import mongoose from "mongoose";
import { Novelty } from "../api/novelties/dao";
import { User } from "../api/users/dao";

export const populateDBDemo = async () => {

        // Cleanup
        await User.deleteMany({})
        await Novelty.deleteMany({})

        // Populate
        const [user1, user2, user3] = await User.create([
            {
                username: "user1",
                email: "example1@demo.com",
                password: "admin1234",
            },
            {
                username: "user2",
                email: "example2@demo.com",
                password: "admin1234",
            },
            {
                username: "user3",
                email: "example3@demo.com",
                password: "admin1234",
            }
        ])

        
        // NOVELTIES
        const novelty1 = await Novelty.create({
            title: "Novelty 1",
            description: "Description 1",
            content: "Content 1",
            author: user1.id,
            status: "PUBLISHED",
        });
        
        const novelty2 = await Novelty.create({
            title: "Novelty 2",
            description: "Description 2",
            content: "Content 2",
            author: user2.id,
            status: "PUBLISHED",
        });
        
        const novelty3 = await Novelty.create({
            title: "Novelty 3",
            description: "Description 3",
            content: "Content 3",
            author: user3.id,
            status: "PUBLISHED",
        });
        
        const novelty4 = await Novelty.create({
            title: "Novelty 4",
            description: "Description 4",
            content: "Content 4",
            author: user1.id,
            status: "PUBLISHED",
        });
    }
        