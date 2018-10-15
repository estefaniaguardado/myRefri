export default interface DetailsError extends Error {
  /**
   * HTTP response status code by the server to the client
   */
  statusCode: number;
  /**
   * Description to show in the client
   */
  description: string;
  /**
   * Details about the info that can help to fix
   */
  details: string;
}
