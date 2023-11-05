type ResponseApi<P> = {
  count: number;
  next: number | null;
  previous: number | null;
  results: P[];
};

export default ResponseApi;
