import db from '../data/database';

interface selectTopics {
    topics: string;
}

function createTopics(abbreviation: string): string[] | null {
    const select = db.prepare(`SELECT topics FROM rpg WHERE abbreviation = ?`);
    const results = select.get(abbreviation) as selectTopics | undefined;

    if (!results) {
        return null;
    }

    return results.topics.split('\n').map(topic => topic.trim()).filter(topic => topic !== '');
}

export { createTopics };