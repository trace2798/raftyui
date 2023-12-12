/**
 * Changes the page based on given parameters.
 * @param {Object} params - The parameters object.
 * @param {number} [params.value] - The value representing the page number.
 * @param {number} params.total - The total number of pages.
 * @param {number} params.pageSize - The number of items per page.
 * @param {Function} [params.onChange] - The function to be called on page change.
 */
export function changePage(params) {
  const { value, total, pageSize, onChange } = params;

  if (onChange && value !== undefined && !isNaN(value)) {
    if (value > total) {
      onChange(total, pageSize);
    } else if (value < 1) {
      onChange(1, pageSize);
    } else {
      onChange(value, pageSize);
    }
  }
}
