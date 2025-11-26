function generate(numRows: number): number[][] {
    const rows: number[][] = [];
    for (let i = 1; i<= numRows; i++) {
        if (i === 1) {
            rows.push([1]);
            continue;
        }
        if (i === 2) {
            rows.push([1, 1]);
            continue;
        }
        const row = [1];
        const lastRow = rows[rows.length - 1];
        for (let j = 1; j < i-1; j++) {
            row.push(lastRow[j-1] + lastRow[j]);
        }
        row.push(1);
        rows.push(row);
    }
    return rows;
};


console.log(generate(5));
