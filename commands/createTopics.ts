import db from '../data/database';

interface selectTopics {
    topics: string;
}

function createTopics(abbreviation: string): string[] | null {
    const select = db.prepare(`SELECT topics FROM rpg WHERE abbreviation = ?`);
    const topics = select.get(abbreviation) as selectTopics | undefined;

    if (!topics) {
        return null;
    }
    
    console.log(`Topics for RPG ${abbreviation}: ${topics.topics}`);

    return topics.topics.split(' ').map(topic => topic.trim()).filter(topic => topic !== '');
}

export { createTopics };