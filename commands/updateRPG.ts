import db from '../data/database';
import { deleteRPG } from './deleteRPG';
import { createRPG } from './createRPG';

function updateRPG(abbreviation: string, user_id: string, topics: string): string {
    deleteRPG(abbreviation, user_id);
    const check = db.prepare(`SELECT 1 FROM rpg WHERE abbreviation = ?`).get(abbreviation);
    
    if (check) {
        return `RPG **${abbreviation}** could not be updated.`;
    }

    createRPG(abbreviation, user_id, topics);

    return `RPG **${abbreviation}** has been updated successfully with new topics.`;
}

export { updateRPG };