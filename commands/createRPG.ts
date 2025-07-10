import db from '../data/database';

function createRPG(abbreviation:string, user_id:string, topics:string): string {
    const insert = db.prepare(`
        INSERT INTO rpg (user_id, abbreviation, topics)
        VALUES (@user_id, @abbreviation, @topics)
    `);

    insert.run({
        user_id: user_id,
        abbreviation: abbreviation,
        topics: topics
    });

    return `RPG ${abbreviation} created successfully! With topics: ${topics}`;
}

export { createRPG };