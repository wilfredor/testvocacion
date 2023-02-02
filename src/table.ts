
export default class Table {
    public static addRow(i: number) {
        const tbody = document.getElementById("table")?.getElementsByTagName("tbody")[0];
        if (!tbody) return;
      
        const tr = document.createElement("tr");
        const cells = [
          i + 1,
          '',
          Table.createRadio(i),
          Table.createRadio(i)
        ];
      
        cells.forEach(cell => {
          const td = document.createElement("td");
          this.addCellContent(cell, td);
          tr.appendChild(td);
        });
      
        tbody.appendChild(tr);
      }

    private static addCellContent (cell:  string | number | HTMLInputElement, td: HTMLTableCellElement) {
        if (cell instanceof HTMLInputElement) {
          td.appendChild(cell);
        } else {
          td.textContent = cell.toString();
        }
      };

     public static createRadio(i:number)
    {
        let radio = document.createElement("input");
        radio.type ='radio';
        radio.name = `question${(i)}`;
        radio.checked = true;
        return radio;
    }
}
