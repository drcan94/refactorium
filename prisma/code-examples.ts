// Code examples for seed data
export const codeExamples = {
  godFunction: {
    badCode: `function processUserOrder(userId, orderData, paymentInfo, shippingAddress) {
  // Validate user
  const user = database.getUser(userId);
  if (!user) throw new Error('User not found');
  if (!user.isActive) throw new Error('User inactive');
  
  // Process payment
  const paymentResult = paymentGateway.processPayment(paymentInfo);
  if (!paymentResult.success) throw new Error('Payment failed');
  
  // Calculate shipping
  const shippingCost = calculateShippingCost(shippingAddress, orderData.weight);
  
  // Create order
  const order = database.createOrder({
    userId,
    items: orderData.items,
    total: orderData.total + shippingCost,
    paymentId: paymentResult.id,
    shippingAddress
  });
  
  // Send confirmation email
  emailService.sendConfirmation(user.email, order);
  
  // Update inventory
  orderData.items.forEach(item => {
    inventory.updateStock(item.id, item.quantity);
  });
  
  return order;
}`,
    goodCode: `// Separate concerns into focused functions
class OrderService {
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private inventoryService: InventoryService,
    private notificationService: NotificationService
  ) {}

  async processOrder(orderRequest: OrderRequest): Promise<Order> {
    const user = await this.userService.validateUser(orderRequest.userId);
    const payment = await this.paymentService.processPayment(orderRequest.payment);
    const order = await this.createOrder(orderRequest, payment);
    await this.fulfillOrder(order);
    await this.notificationService.sendConfirmation(user, order);
    return order;
  }

  private async createOrder(request: OrderRequest, payment: Payment): Promise<Order> {
    return this.orderRepository.create({
      userId: request.userId,
      items: request.items,
      total: this.calculateTotal(request.items, request.shippingAddress),
      paymentId: payment.id,
      shippingAddress: request.shippingAddress
    });
  }

  private async fulfillOrder(order: Order): Promise<void> {
    await this.inventoryService.updateStock(order.items);
  }
}`,
  },

  magicNumbers: {
    badCode: `function calculateDiscount(price, userType) {
  if (userType === 'premium') {
    return price * 0.15; // What is 0.15?
  } else if (userType === 'vip') {
    return price * 0.25; // What is 0.25?
  }
  return price * 0.05; // What is 0.05?
}

function validatePassword(password) {
  if (password.length < 8) { // Why 8?
    return false;
  }
  if (password.length > 128) { // Why 128?
    return false;
  }
  return true;
}

function scheduleBackup() {
  setTimeout(() => {
    performBackup();
  }, 86400000); // What is 86400000?
}`,
    goodCode: `// Use named constants to explain the meaning
const DISCOUNT_RATES = {
  PREMIUM: 0.15,
  VIP: 0.25,
  STANDARD: 0.05
} as const;

const PASSWORD_CONSTRAINTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128
} as const;

const TIME_IN_MS = {
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  MINUTE: 60 * 1000
} as const;

function calculateDiscount(price: number, userType: UserType): number {
  const discountRate = DISCOUNT_RATES[userType] || DISCOUNT_RATES.STANDARD;
  return price * discountRate;
}

function validatePassword(password: string): boolean {
  return password.length >= PASSWORD_CONSTRAINTS.MIN_LENGTH && 
         password.length <= PASSWORD_CONSTRAINTS.MAX_LENGTH;
}

function scheduleBackup(): void {
  setTimeout(() => {
    performBackup();
  }, TIME_IN_MS.DAY);
}`,
  },

  duplicateLogic: {
    badCode: `function processUserData(userData) {
  // Validation logic repeated
  if (!userData.email || !userData.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (!userData.name || userData.name.length < 2) {
    throw new Error('Invalid name');
  }
  
  // Process user...
}

function processAdminData(adminData) {
  // Same validation logic repeated
  if (!adminData.email || !adminData.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (!adminData.name || adminData.name.length < 2) {
    throw new Error('Invalid name');
  }
  
  // Process admin...
}

function processCustomerData(customerData) {
  // Same validation logic repeated again
  if (!customerData.email || !customerData.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (!customerData.name || customerData.name.length < 2) {
    throw new Error('Invalid name');
  }
  
  // Process customer...
}`,
    goodCode: `// Extract common validation logic
class UserValidator {
  static validateEmail(email: string): void {
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email');
    }
  }

  static validateName(name: string): void {
    if (!name || name.length < 2) {
      throw new Error('Invalid name');
    }
  }

  static validateUserData(data: UserData): void {
    this.validateEmail(data.email);
    this.validateName(data.name);
  }
}

// Use the extracted validation
function processUserData(userData: UserData): void {
  UserValidator.validateUserData(userData);
  // Process user...
}

function processAdminData(adminData: AdminData): void {
  UserValidator.validateUserData(adminData);
  // Process admin...
}

function processCustomerData(customerData: CustomerData): void {
  UserValidator.validateUserData(customerData);
  // Process customer...
}`,
  },

  longParameterList: {
    badCode: `function createUser(firstName, lastName, email, phone, address, city, state, zipCode, country, dateOfBirth, gender, occupation, company, salary, department, managerId, startDate, contractType, benefits, emergencyContact, emergencyPhone, notes, isActive, permissions, lastLogin, createdAt, updatedAt) {
  // Function with too many parameters
  return {
    firstName, lastName, email, phone, address, city, state, zipCode,
    country, dateOfBirth, gender, occupation, company, salary, department,
    managerId, startDate, contractType, benefits, emergencyContact,
    emergencyPhone, notes, isActive, permissions, lastLogin, createdAt, updatedAt
  };
}`,
    goodCode: `// Use parameter objects to group related data
interface UserPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: Gender;
}

interface UserAddress {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface UserEmployment {
  occupation: string;
  company: string;
  salary: number;
  department: string;
  managerId: string;
  startDate: Date;
  contractType: ContractType;
  benefits: string[];
}

interface UserMetadata {
  isActive: boolean;
  permissions: Permission[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

function createUser(userData: {
  personal: UserPersonalInfo;
  address: UserAddress;
  employment: UserEmployment;
  emergencyContact: EmergencyContact;
  notes?: string;
  metadata: UserMetadata;
}): User {
  return {
    ...userData.personal,
    ...userData.address,
    ...userData.employment,
    emergencyContact: userData.emergencyContact,
    notes: userData.notes,
    ...userData.metadata
  };
}`,
  },

  deadCode: {
    badCode: `function calculateTotal(items) {
  let total = 0;
  
  // This function is never called
  function oldCalculationMethod(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
  
  // This variable is never used
  const taxRate = 0.08;
  
  // This code block is commented out but never removed
  // if (items.length > 10) {
  //   total = total * 0.9; // 10% discount
  // }
  
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  
  // This console.log is left from debugging
  console.log('Calculating total for', items.length, 'items');
  
  return total;
}`,
    goodCode: `function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Clean, focused function without dead code
function calculateTotalWithTax(items: Item[], taxRate: number): number {
  const subtotal = calculateTotal(items);
  return subtotal * (1 + taxRate);
}`,
  },

  primitiveObsession: {
    badCode: `function processOrder(customerId, productId, quantity, price, discount, tax, shippingCost, orderDate, deliveryDate, status) {
  // Using primitives instead of value objects
  if (customerId <= 0) throw new Error('Invalid customer ID');
  if (productId <= 0) throw new Error('Invalid product ID');
  if (quantity <= 0) throw new Error('Invalid quantity');
  if (price < 0) throw new Error('Invalid price');
  if (discount < 0 || discount > 1) throw new Error('Invalid discount');
  if (tax < 0) throw new Error('Invalid tax');
  if (shippingCost < 0) throw new Error('Invalid shipping cost');
  
  const total = (price * quantity * (1 - discount)) + tax + shippingCost;
  
  return {
    customerId,
    productId,
    quantity,
    price,
    discount,
    tax,
    shippingCost,
    total,
    orderDate,
    deliveryDate,
    status
  };
}`,
    goodCode: `// Use value objects instead of primitives
class CustomerId {
  constructor(private readonly value: number) {
    if (value <= 0) throw new Error('Customer ID must be positive');
  }
  
  getValue(): number {
    return this.value;
  }
}

class ProductId {
  constructor(private readonly value: number) {
    if (value <= 0) throw new Error('Product ID must be positive');
  }
  
  getValue(): number {
    return this.value;
  }
}

class Quantity {
  constructor(private readonly value: number) {
    if (value <= 0) throw new Error('Quantity must be positive');
  }
  
  getValue(): number {
    return this.value;
  }
}

class Money {
  constructor(private readonly amount: number) {
    if (amount < 0) throw new Error('Amount cannot be negative');
  }
  
  getAmount(): number {
    return this.amount;
  }
  
  add(other: Money): Money {
    return new Money(this.amount + other.amount);
  }
  
  multiply(factor: number): Money {
    return new Money(this.amount * factor);
  }
}

class Discount {
  constructor(private readonly rate: number) {
    if (rate < 0 || rate > 1) throw new Error('Discount rate must be between 0 and 1');
  }
  
  getRate(): number {
    return this.rate;
  }
  
  applyTo(amount: Money): Money {
    return amount.multiply(1 - this.rate);
  }
}

function processOrder(
  customerId: CustomerId,
  productId: ProductId,
  quantity: Quantity,
  price: Money,
  discount: Discount,
  tax: Money,
  shippingCost: Money,
  orderDate: Date,
  deliveryDate: Date,
  status: OrderStatus
): Order {
  const subtotal = price.multiply(quantity.getValue());
  const discountedAmount = discount.applyTo(subtotal);
  const total = discountedAmount.add(tax).add(shippingCost);
  
  return new Order(
    customerId,
    productId,
    quantity,
    total,
    orderDate,
    deliveryDate,
    status
  );
}`,
  },

  featureEnvy: {
    badCode: `class Order {
  constructor(private customer: Customer, private items: Item[]) {}
  
  calculateTotal() {
    let total = 0;
    for (const item of this.items) {
      // Order is doing too much work with Customer data
      if (this.customer.isVip()) {
        total += item.price * 0.9; // 10% discount for VIP
      } else if (this.customer.getMembershipLevel() === 'gold') {
        total += item.price * 0.95; // 5% discount for gold
      } else {
        total += item.price;
      }
      
      // Order is also doing tax calculations
      if (this.customer.getCountry() === 'US') {
        total += item.price * 0.08; // 8% tax for US
      } else if (this.customer.getCountry() === 'CA') {
        total += item.price * 0.13; // 13% tax for Canada
      }
    }
    return total;
  }
}`,
    goodCode: `// Move discount logic to Customer
class Customer {
  constructor(
    private name: string,
    private membershipLevel: MembershipLevel,
    private country: string
  ) {}
  
  calculateDiscount(price: number): number {
    if (this.isVip()) {
      return price * 0.9; // 10% discount for VIP
    } else if (this.membershipLevel === 'gold') {
      return price * 0.95; // 5% discount for gold
    }
    return price;
  }
  
  calculateTax(price: number): number {
    const taxRates = {
      'US': 0.08,
      'CA': 0.13,
      'UK': 0.20
    };
    return price * (taxRates[this.country] || 0);
  }
  
  private isVip(): boolean {
    return this.membershipLevel === 'vip';
  }
}

// Move tax logic to a dedicated service
class TaxService {
  calculateTax(price: number, country: string): number {
    const taxRates = {
      'US': 0.08,
      'CA': 0.13,
      'UK': 0.20
    };
    return price * (taxRates[country] || 0);
  }
}

class Order {
  constructor(
    private customer: Customer,
    private items: Item[],
    private taxService: TaxService
  ) {}
  
  calculateTotal(): number {
    let total = 0;
    for (const item of this.items) {
      const discountedPrice = this.customer.calculateDiscount(item.price);
      const tax = this.taxService.calculateTax(discountedPrice, this.customer.getCountry());
      total += discountedPrice + tax;
    }
    return total;
  }
}`,
  },

  dataClumps: {
    badCode: `function createUser(firstName, lastName, email, phone, address, city, state, zipCode) {
  // Address data is clumped together
  return {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode
  };
}

function updateUser(userId, firstName, lastName, email, phone, address, city, state, zipCode) {
  // Same address data clump repeated
  return database.updateUser(userId, {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zipCode
  });
}

function validateUser(firstName, lastName, email, phone, address, city, state, zipCode) {
  // Address validation logic repeated
  if (!address || address.length < 5) return false;
  if (!city || city.length < 2) return false;
  if (!state || state.length < 2) return false;
  if (!zipCode || !/^\d{5}$/.test(zipCode)) return false;
  return true;
}`,
    goodCode: `// Extract address into its own class
class Address {
  constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string
  ) {
    this.validate();
  }
  
  private validate(): void {
    if (!this.street || this.street.length < 5) {
      throw new Error('Invalid street address');
    }
    if (!this.city || this.city.length < 2) {
      throw new Error('Invalid city');
    }
    if (!this.state || this.state.length < 2) {
      throw new Error('Invalid state');
    }
    if (!this.zipCode || !/^\d{5}$/.test(this.zipCode)) {
      throw new Error('Invalid zip code');
    }
  }
  
  toString(): string {
    return \`\${this.street}, \${this.city}, \${this.state} \${this.zipCode}\`;
  }
}

class ContactInfo {
  constructor(
    public readonly email: string,
    public readonly phone: string
  ) {
    this.validate();
  }
  
  private validate(): void {
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email');
    }
    if (!this.phone || !/^\d{10}$/.test(this.phone)) {
      throw new Error('Invalid phone number');
    }
  }
}

function createUser(firstName: string, lastName: string, contactInfo: ContactInfo, address: Address) {
  return {
    firstName,
    lastName,
    contactInfo,
    address
  };
}

function updateUser(userId: string, firstName: string, lastName: string, contactInfo: ContactInfo, address: Address) {
  return database.updateUser(userId, {
    firstName,
    lastName,
    contactInfo,
    address
  });
}`,
  },

  shotgunSurgery: {
    badCode: `// Adding a new field requires changes in multiple places
class User {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }
}

// Change 1: Update constructor
function createUser(name, email, age, phone) {
  return new User(name, email, age, phone);
}

// Change 2: Update validation
function validateUser(user) {
  if (!user.name) return false;
  if (!user.email) return false;
  if (!user.age) return false;
  if (!user.phone) return false; // New validation
  return true;
}

// Change 3: Update database save
function saveUser(user) {
  database.save('users', {
    name: user.name,
    email: user.email,
    age: user.age,
    phone: user.phone // New field
  });
}

// Change 4: Update display
function displayUser(user) {
  console.log(\`Name: \${user.name}\`);
  console.log(\`Email: \${user.email}\`);
  console.log(\`Age: \${user.age}\`);
  console.log(\`Phone: \${user.phone}\`); // New display
}

// Change 5: Update API response
function getUserResponse(user) {
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    phone: user.phone // New field
  };
}`,
    goodCode: `// Use a centralized approach with proper encapsulation
class User {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly age: number,
    private readonly phone: string
  ) {
    this.validate();
  }
  
  private validate(): void {
    if (!this.name) throw new Error('Name is required');
    if (!this.email) throw new Error('Email is required');
    if (!this.age) throw new Error('Age is required');
    if (!this.phone) throw new Error('Phone is required');
  }
  
  // Getters provide controlled access
  getId(): string { return this.id; }
  getName(): string { return this.name; }
  getEmail(): string { return this.email; }
  getAge(): number { return this.age; }
  getPhone(): string { return this.phone; }
  
  // Single method to get all data
  toObject(): UserData {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      age: this.age,
      phone: this.phone
    };
  }
}

// Single factory method
class UserFactory {
  static createUserData(name: string, email: string, age: number, phone: string): User {
    const id = generateId();
    return new User(id, name, email, age, phone);
  }
}

// Single validation method
class UserValidator {
  static validate(user: User): boolean {
    try {
      // Validation is handled in constructor
      return true;
    } catch {
      return false;
    }
  }
}

// Single persistence method
class UserRepository {
  async save(user: User): Promise<void> {
    await database.save('users', user.toObject());
  }
  
  async findById(id: string): Promise<User | null> {
    const data = await database.findById('users', id);
    return data ? new User(data.id, data.name, data.email, data.age, data.phone) : null;
  }
}

// Single display method
class UserDisplay {
  static format(user: User): string {
    const data = user.toObject();
    return \`Name: \${data.name}, Email: \${data.email}, Age: \${data.age}, Phone: \${data.phone}\`;
  }
}`,
  },
};
