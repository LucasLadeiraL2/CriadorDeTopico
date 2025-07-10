import db from '../data/database';

function listRPGs(): string {
    const select = db.prepare(`SELECT abbreviation FROM rpg`);
    const abbreviation = select.all();

    if (abbreviation.length === 0) {
        return "No RPGs found.";
    }
    
    return `Available RPGs: ${abbreviation.join(', ')}`;
}

export { listRPGs };