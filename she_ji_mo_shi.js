/**
 * js代码实现设计模式
 */

/**
 * 工厂模式 创建型
 * 工厂模式是一种创建对象的方式，其不直接调用构造函数来创建对象，而是提供一个共同的接口来创建对象。此模式常用于大量对象的创建或需要动态创建对象的场景。
 */
class Animal {
  constructor(name) {
    this.name = name;
  }

  say() {}
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  say() {
    console.log("dog say");
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
  }

  say() {
    console.log("cat say");
  }
}

// 工厂函数
function createAnimal(type, name) {
  switch (type) {
    case "dog":
      return new Dog(name);
    case "cat":
      return new Cat(name);

    default:
      throw new Error("type error");
  }
}

// 创建实例
const animal1 = createAnimal("dog", "tom");
animal1.say();
const animal2 = createAnimal("cat", "jack");
animal2.say();

/**
 * 单例模式 创建型
 * 单例模式是一种保证在整个应用中只有一个实例的模式。一般通过将构造函数定义为私有方法并提供一个公共方法来在需要时创建该类的一个新实例或返回现有实例。
 */
class Singleton {
  static instance = null;

  constructor(name) {
    if (Singleton.instance !== null) {
      return Singleton.instance;
    }
    this.name = name;
    Singleton.instance = this;
  }

  say() {
    console.log("singleton say: " + this.name);
  }
}

// 创建实例
const singleton1 = new Singleton("tom");
singleton1.say();
const singleton2 = new Singleton("jack");
singleton2.say();

/**
 * 原型模式 创建型
 * 原型模式是一种创建对象的方式，其不直接调用构造函数来创建对象，而是通过原型对象来创建对象。
 */

/**
 * 建造者模式 创建型
 * 建造者模式是一种创建对象的方式，其不直接调用构造函数来创建对象，而是通过一个包含多个步骤的过程来创建对象。
 */

// 建造者
class CarBuilder {
  constructor({ color = "white", weight = 0 }) {
    this.color = color;
    this.weight = weight;
  }

  buildType(type) {
    const type = {};
    switch (key) {
      case "small":
        type.name = "small";
        type.intro = "small";
        break;
      case "normal":
        type.name = "normal";
        type.intro = "normal";
        break;
      case "big":
        type.name = "big";
        type.intro = "big";
        break;
    }
    this.type = type;
  }
}

// 指挥者
class BenchiDirector {
  constructor(type, param) {
    const car = new CarBuilder(param);
    car.buildType(type);
    return car;
  }
}

const benchi = new BenchiDirector("small", { color: "red" });


/**
 * 适配器模式 结构型
 * 适配器模式是一种结构型模式，其目的是将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。
 */

// 被适配对象
class Device {
  constructor(id) {
    this.id = id;
  }
  
  operation() {
    console.log(`Device ${this.id} is operating...`);
  }
}

// 适配器类
class Adapter {
  constructor(device) {
    this.device = device;
  }
  
  operation() {
    console.log(`Adapter for device ${this.device.id} is operating...`);
    this.device.operation();
  }
}

// 创建被适配对象
const device = new Device(1);

// 创建适配器对象并传入被适配对象
const adapter = new Adapter(device);

// 调用适配器对象的操作方法
adapter.operation();