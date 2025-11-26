function getRow(numRows: number): number[] {
    let row: number[] = [];
    let lastRow: number[];

    for (let i = 0; i<= numRows; i++) {
        if (i < 2) {
            row.push(1);
            continue;
        }
        lastRow = row;
        row = [1];
        for (let j = 1; j < i; j++) {
            row.push(lastRow[j-1] + lastRow[j]);
        }
        row.push(1);
    }
    return row;
};


console.log(getRow(3));
