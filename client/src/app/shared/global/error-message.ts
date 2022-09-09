export function ErrorMessage(error: any) {
  let message: string;
  if (error.message && !error.message.includes('internal')) {
    message = error.message
  } else {
    switch (error.statusCode) {
      case 400:
        message = 'درخواست نامعتبر می باشد'
        break;
      case 401:
        message = 'دسترسی غیرمجاز می باشد'
        break;
      case 403:
        message = 'دسترسی وجود ندارد'
        break;
      case 404:
        message = 'درخواست مورد نظر یافت نشد'
        break;
      case 422:
        message = 'ورودی نامعتبر است'
        break;
      case 500:
        message = 'خطا در ارتباط با سرور'
        break;
      default:
        message = 'خطا در ارتباط با پایگاه داده'
        break;
    }
  }
  return message
}
