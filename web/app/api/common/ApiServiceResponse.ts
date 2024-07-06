export class ApiServiceResponse<TResponse> {
  constructor(public status: number, public data: TResponse) {}
}
