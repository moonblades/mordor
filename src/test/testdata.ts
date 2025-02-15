const user = {
  email: "foo.bar@baz.com",
  displayName: "foo",
  imageUrl: "https://fake.com/fake_image.png",
  name: "foo",
  surname: "bar",
  password: "foobared",
  phoneNumber: "1234567890",
  streetAndNumber: "Street 1",
  city: "City",
  postalCode: "0000",
  receiveNotification: true,
  anonymous: false,
};

const business = {
  vatNumber: "VAT-1234",
  phoneNumber: "1234567890",
  name: "Oceanic Airlines",
  description: "Lorem ipsum",
  imageUrl: "https://picsum.photos/200",
  currency: "EUR",
  timeZone: "IT",
  streetAndNumber: "Nowhere 1",
  postalCode: "0001",
  city: "City",
  industry: "Traeveling",
  cancelationTime: 10,
};

const reservation = {
  date: "2004-09-22T00:00:00.000Z",
  reminderToUser: true,
  cancelable: false,
  completed: false,
};

const product = {
  name: "Flight 815",
  description: "Lorem ipsum",
  price: 150.0,
  duration: 360,
  preparation: 5,
  postProcessing: 5,
  sale: false,
  available: true,
  cancelationTime: 72,
};

const employee = {
  name: "John",
  surname: "Doe",
};

const schedule = {
  dayOfWeek: 1,
  startTime: "00:00:00",
  time: 90,
};

const vacation = {
  dateStart: "2020-09-22T00:00:00.000Z",
  dateEnd: "2020-10-22T00:00:00.000Z",
};

export { user, business, reservation, product, employee, schedule, vacation };
