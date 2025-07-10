import db from '../data/database';
import { RPGTable } from '../data/tableTypes';

function deleteRPG(abbreviation:string, user_id:string): string {
    const check = db.prepare(`SELECT 1 FROM rpg WHERE abbreviation = ?`).get(abbreviation) as RPGTable | undefined;

    if (!check) {
        return `RPG **${abbreviation}** not found.`;
    }

    if (check.user_id === user_id) {
        db.prepare(`DELETE FROM rpg WHERE abbreviation = ?`).run(abbreviation);
        return `RPG **${abbreviation}** has been deleted successfully.`;
    } else {
        return `You do not have permission to delete the RPG **${abbreviation}**.`;
    }
}

export { deleteRPG };