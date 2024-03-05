export class ListPaginateComponent {
    totalCount: number = 0;
    pageNumber = 1;
    pageSize = 10;
    onPageChange(pageNumber: number): void {
        this.pageNumber = pageNumber;
        this.load();
    }

    load() {
        throw new Error("Method not implemented.");
    }
}