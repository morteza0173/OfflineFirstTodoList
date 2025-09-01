import Listitems from "./Listitems";

const testList = [
  {
    id: "1",
    title: "خرید نان",
    completed: false,
    createdAt: "2025-08-28T10:00:00.000Z",
    updatedAt: "2025-08-28T10:00:00.000Z",
  },
  {
    id: "2",
    title: "مطالعه یک فصل از کتاب",
    completed: true,
    createdAt: "2025-08-27T09:00:00.000Z",
    updatedAt: "2025-08-27T12:00:00.000Z",
  },
  {
    id: "3",
    title: "تماس با علی",
    completed: false,
    createdAt: "2025-08-28T11:00:00.000Z",
    updatedAt: "2025-08-28T11:00:00.000Z",
  },
  {
    id: "4",
    title: "ورزش روزانه",
    completed: true,
    createdAt: "2025-08-26T07:30:00.000Z",
    updatedAt: "2025-08-26T08:00:00.000Z",
  },
  {
    id: "5",
    title: "نوشتن مقاله وبلاگ",
    completed: false,
    createdAt: "2025-08-25T15:00:00.000Z",
    updatedAt: "2025-08-25T15:00:00.000Z",
  },
  {
    id: "6",
    title: "یادگیری ری‌اکت کوئری",
    completed: false,
    createdAt: "2025-08-24T13:00:00.000Z",
    updatedAt: "2025-08-24T13:00:00.000Z",
  },
  {
    id: "7",
    title: "مرور درس‌های دانشگاه",
    completed: true,
    createdAt: "2025-08-23T20:00:00.000Z",
    updatedAt: "2025-08-23T21:00:00.000Z",
  },
  {
    id: "8",
    title: "پرداخت قبض برق",
    completed: false,
    createdAt: "2025-08-22T08:00:00.000Z",
    updatedAt: "2025-08-22T08:00:00.000Z",
  },
  {
    id: "9",
    title: "نوشتن تست برای پروژه",
    completed: false,
    createdAt: "2025-08-21T14:00:00.000Z",
    updatedAt: "2025-08-21T14:00:00.000Z",
  },
  {
    id: "10",
    title: "تماشای فیلم آخر هفته",
    completed: true,
    createdAt: "2025-08-20T19:00:00.000Z",
    updatedAt: "2025-08-20T21:00:00.000Z",
  },
];

const List = () => {
  return (
    <div className="w-full">
      {testList.map((item, index) => (
        <Listitems key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};
export default List;
