J5e device instantiation allows for a few different patterns. On one hand we wanted to allow the simplest possible use case where the only parameter we need is the pin number, and on the other hand we need to be able to support complex io and device instantiations whose details we cannot foresee.

````js
new DeviceClass(options);
````

The ```options``` object includes a mix of ```io``` and ```device``` properties. To that end, it is important that device properties not have name conflicts with io properties.

## The ```io``` properties
In TC-53 parlance, an "IO" is a single GPIO (General-Purpose Input/Output) instance. That GPIO Instance could be Digital, PWM, Serial, I2C, SPI or something else. **The ```io``` properties of the options object describe the configuration for the IO instance**. This configuration could include which board to use, which pins, what data rate, etc. The details depend on your situation and provider. 

*Whoah, what's a provider?*

In the physical world a provider is a "thing" (hardware or software) that provides constructors for IO instances. The IO could be built into the device running your JavaScript, part of a physically connected device like an expander or external microcontroller, or even part of a cloud service that controls a device located halfway around the world. 

In code a provider is a bundle of classes that work with that "thing". Providers could come from a board manufacturer, an expander library, an IoT cloud service, an open source hero, or a myriad of other places. The most basic providers are the **builtins** that are bundled with some platforms. For the ESP8266, providers are bundled with the [Moddable SDK](https://github.com/Moddable-OpenSource/moddable), and are part of that SDK's IO module. They give access to the ESP8266's built-in GPIO pins. Non-builtin providers are known as "external providers".

The options argument is always required and can take a few different forms: 
* **Pin Identifier** - This is the simplest scenario and would be a single number or string. J5e will assume the provider is a builtin. The particular type of IO will vary by device class. For example, servo would default to ```builtin/PWM```. Button or switch would default to ```builtin/Digital```.
  ````js
  import LED from "j5e/led";

  // Instantiate an LED connected to 
  // builtin pin 13
  const led = await new LED(13);

  led.blink();
  ````

  *You may notice that we are using Top Level Await when instantiating the device. We get away with this by using an IIFE that returns an async function.*
---
* **Object Literal** - Sometimes it is necessary to specify more than just a pin number to instantiate an IO. For example if you are using an external provider, or need to set the data speed.
  ````js
  import LED from "j5e/led";
  
  // Instantiate an LED connected to 
  // an expander on pin 2
  const led = await new LED({
    io: "PCA9685/PWM",
    address: 0x40,
    pin: 2
  });

  led.blink();
  ```` 
---
* **IO Instance** - Sometimes it may be necessary to explicitly instantiate the IO and pass that instance on to J5e.
  ````js
  import PWM from "PCA9685/PWM";
  import LED from "j5e/LED";
  
  // Instantiate a PWM I/O connected to 
  // an expander on pin 2
  const ledIO = await new PWM({
    pin: 2,
    address: 0x40
  });
  
  // Instantiate an LED connected to 
  // our LED IO
  const led = await new LED(ledIO);

  led.pulse();  
  ````
  *Note that some J5e classes will not allow an IO Instance to be passed in as an io param. Specifically, any J5e class that depends on callbacks for its event emitters must instantiate its own IO instances. The TC-53 specification draft does not allow for mutable callbacks on IO instances.*

  ---
* **IO Module Path** - It's also possible to pass the path to the IO module you want to use as a string. J5e will import the module dynamically, instantiate an IO, and attach it to your device. You will need to have included that module in your manifest.json or whatever module scheme is appropriate for your environment.
  ````js
  import LED from "j5e/LED";
  
  // Instantiate an LED connected to an expander
  const led = await new LED({
    io: "PCA9685/PWM",
    address: 0x40,
    pin: 2
  });

  led.pulse();  
  ````
---
* **A Homogenous Array of Pin Identifiers, Object Literals, or IO Instances** - Some devices require more than one IO. For example, and RGB LED requires three PWM IO's. The order of the elements in the array is important and is specific to the type of device.
  ````js
  import RGB from "@5e/RGB";
  // Instantiate an RGB LED connected to 
  // built-in pins 12, 13 and 14 
  const rgb = await new RGB([12, 13, 14]);

  led.blink();
  ````
---
* **A Heterogenous Array of Pin Identifiers, Object Literals, and/or IO Instances** - You can also use more complex combinations in your array. For example, some devices require multiple IO's suppplied by more than one provider. A motor controller may use a PWM expander to control motor speed and a built-in digital pin to control direction. The order of the elements in the array matters and varies with the type of device.
  ````js
  import PWM from "PCA9685/PWM";
  import Motor from "j5e/motor";

  // Instantiate a PWM I/O connected to 
  // pin 2 of an expander
  const speedIO = await new PWM({
    pin: 2,
    address: 0x40
  });

  // Instantiate a motor connected to 
  // speedIO and pin 13 on builtin
  const m1 = await new Motor([ speedIO, 13 ]);
    
  m1.forward();
  ````

  ## The ```device```
  A device is something connected to your IO(s). It could be a sensor, a switch, and LED, a motor, a GPS receiver, or whatever. The universe of devices is vast. Since the details of the device properties can vary greatly, you need to reference the documentation for each device class to know how to use them. These properties are frequently optional. If you do not pass device specific properties int he options, J5e will use default values for the most common devices and scenarios.

  * **An Object Literal** - In this scenario, the ```device``` argument is passing a device-specific configuration.
  ````js
  import Servo from "j5e/servo";

  const servo = await new Servo({
    pin: 13,
    pwmRange: [700, 2300],
    offset: 3
  });

  servo.sweep();
  ````
---
