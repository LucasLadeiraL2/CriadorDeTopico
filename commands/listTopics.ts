import db from '../data/database';
interface selectTopics {
    topics: string;
}

function listTopics(abbreviation: string): string {
    const select = db.prepare(`SELECT topics FROM rpg WHERE abbreviation = ?`);
    const result = select.get(abbreviation) as selectTopics | undefined;
    return result ? `Topics for RPG **${abbreviation}**: ${result.topics}` : `RPG **${abbreviation}** not found.`;
}

export { listTopics };