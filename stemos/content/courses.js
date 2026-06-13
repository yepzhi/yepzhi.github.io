/**
 * stemOS ESP Course Content Database
 * ====================================
 * English for Specific Purposes (ESP) — Nearshoring Industry Tracks
 * Target Level: A2+ (CEFR)
 * Format: 10-minute readings with key vocabulary and comprehension activities
 * 
 * Structure:
 *  - Each TRACK maps to a node on the stemOS Skills Graph
 *  - Each track has MODULES (sub-skills)
 *  - Each module has READINGS (~10 min each, 500-800 words)
 *  - Each reading has VOCABULARY (EN-ES glossary) and QUESTIONS
 */

const ESP_COURSES = {

    // =========================================================================
    // TRACK 1: SMART NETWORKS & CYBERSECURITY (FULL CONTENT)
    // =========================================================================
    "cybersecurity": {
        id: "cybersecurity",
        title: "Redes Inteligentes y Ciberseguridad",
        titleEN: "Smart Networks & Cybersecurity",
        level: "A2-B1",
        status: "full", // full content
        description: "Learn the English vocabulary and concepts you need to work in network engineering and cybersecurity. From basic network components to advanced security protocols.",
        descriptionES: "Aprende el vocabulario y los conceptos en inglés que necesitas para trabajar en ingeniería de redes y ciberseguridad.",
        totalModules: 6,
        estimatedHours: 12,
        prerequisites: ["esp-foundation"], // Bridge A2
        standard: "CONOCER EC1290",
        modules: [
            // -----------------------------------------------------------------
            // MODULE 1: Introduction to Smart Networks
            // -----------------------------------------------------------------
            {
                id: "cyber-m1",
                title: "Introduction to Smart Networks",
                titleES: "Introducción a las Redes Inteligentes",
                icon: "fa-solid fa-network-wired",
                readings: [
                    {
                        id: "cyber-m1-r1",
                        title: "What Is a Network?",
                        duration: "10 min",
                        content: `
# What Is a Network?

Every time you send a message on your phone, watch a video online, or check your email, you are using a **network**. But what exactly is a network?

## A Simple Definition

A **computer network** is a group of two or more devices that are **connected** to each other so they can **share information**. These devices can be computers, phones, tablets, printers, or even smart refrigerators.

Think of it like a road system in a city. The roads connect different buildings (devices), and cars (data) travel along these roads to reach their destination.

## Why Do We Need Networks?

Before networks existed, if you wanted to share a file with a colleague, you had to copy it onto a **floppy disk** or USB drive and physically carry it to their computer. This was slow and inconvenient.

Networks solve this problem. They allow devices to:

- **Share files** and documents instantly
- **Share resources** like printers and storage
- **Communicate** through email, chat, and video calls
- **Access the internet** and cloud services

## Key Components of a Network

Every network has some basic **components** (parts):

1. **Devices** (also called **nodes** or **endpoints**): These are the computers, phones, and other equipment connected to the network. Each device has a unique address called an **IP address** (Internet Protocol address).

2. **Cables and Connections**: Devices connect to each other using **cables** (like Ethernet cables) or **wireless signals** (Wi-Fi). The physical or wireless path between devices is called a **link**.

3. **Switches**: A **switch** is a device that connects multiple devices within the same network. When Device A sends data to Device B, the switch makes sure the data goes to the right place.

4. **Routers**: A **router** connects different networks together. For example, your home router connects your home network to the internet. The router decides the best **path** for data to travel.

5. **Servers**: A **server** is a powerful computer that stores data and provides **services** to other devices (called **clients**). When you visit a website, your browser (the client) requests information from a server.

## How Data Travels

When you send a message, your device doesn't send it as one big piece. Instead, the message is divided into small pieces called **packets**. Each packet travels through the network independently and may take different routes. When all packets arrive at the destination, they are **reassembled** into the original message.

This process is governed by rules called **protocols**. The most important protocol on the internet is **TCP/IP** (Transmission Control Protocol / Internet Protocol).

## Smart Networks

A **smart network** is a modern network that uses **software** and **artificial intelligence** to manage itself. Traditional networks require a human administrator to configure every device manually. Smart networks can:

- **Detect problems** automatically (like a broken connection)
- **Optimize performance** by choosing the fastest routes for data
- **Protect against threats** by identifying suspicious activity
- **Adapt** to changes in the number of connected devices

Smart networks are essential for modern technologies like the **Internet of Things (IoT)**, where thousands of sensors and devices need to communicate efficiently.

---

> **Key Takeaway**: A network connects devices so they can share data. Understanding the basic components — devices, switches, routers, servers, and protocols — is the foundation for everything you will learn in this course.
`,
                        vocabulary: [
                            { en: "Network", es: "Red", definition: "A group of connected devices that share information" },
                            { en: "Device / Node", es: "Dispositivo / Nodo", definition: "Any equipment connected to a network (computer, phone, etc.)" },
                            { en: "Switch", es: "Conmutador / Switch", definition: "A device that connects multiple devices in the same network" },
                            { en: "Router", es: "Enrutador / Router", definition: "A device that connects different networks and directs data" },
                            { en: "Server", es: "Servidor", definition: "A computer that stores data and provides services to other devices" },
                            { en: "Client", es: "Cliente", definition: "A device that requests services from a server" },
                            { en: "IP Address", es: "Dirección IP", definition: "A unique number that identifies each device on a network" },
                            { en: "Packet", es: "Paquete", definition: "A small piece of data sent through a network" },
                            { en: "Protocol", es: "Protocolo", definition: "A set of rules for how data is sent and received" },
                            { en: "TCP/IP", es: "TCP/IP", definition: "The main protocol used on the internet" },
                            { en: "Link", es: "Enlace", definition: "The connection path between two devices" },
                            { en: "Wireless", es: "Inalámbrico", definition: "Without cables, using radio signals (Wi-Fi)" }
                        ],
                        questions: [
                            { q: "What is a computer network?", options: ["A single computer working alone", "Two or more devices connected to share information", "A type of software", "A programming language"], answer: 1 },
                            { q: "What does a router do?", options: ["It stores files", "It connects devices in the same network", "It connects different networks together", "It prints documents"], answer: 2 },
                            { q: "What are packets?", options: ["Large files", "Small pieces of data sent through a network", "Types of cables", "Network passwords"], answer: 1 },
                            { q: "What makes a network 'smart'?", options: ["It uses expensive cables", "It uses software and AI to manage itself", "It only works with smartphones", "It has more than 100 devices"], answer: 1 }
                        ]
                    },
                    {
                        id: "cyber-m1-r2",
                        title: "Types of Networks: LAN, WAN, and More",
                        duration: "10 min",
                        content: `
# Types of Networks: LAN, WAN, and More

Not all networks are the same size. Some networks connect devices in a single room, while others connect devices across entire continents. Engineers classify networks by their **geographic scope** — how large an area they cover.

## LAN — Local Area Network

A **LAN** (Local Area Network) is the most common type of network. It connects devices in a **small area**, such as:

- A home (your Wi-Fi network)
- An office
- A school building
- A factory floor

LANs are fast because the devices are close together. Most LANs use **Ethernet cables** or **Wi-Fi** for connections. A typical LAN speed is between **100 Mbps** and **1 Gbps** (Megabits/Gigabits per second).

**Example**: In a semiconductor factory in Hermosillo, the computers on the production floor are connected through a LAN. This allows the quality control team to instantly access data from manufacturing sensors.

## WAN — Wide Area Network

A **WAN** (Wide Area Network) connects devices across a **large geographic area**, such as:

- Different cities
- Different states or countries
- Entire continents

The **internet** is the largest WAN in the world. WANs are generally **slower** than LANs because data has to travel longer distances. Companies use WANs to connect their offices in different cities.

**Example**: A nearshoring company with offices in Monterrey and Phoenix uses a WAN to connect both locations so employees can access the same databases and communication tools.

## MAN — Metropolitan Area Network

A **MAN** (Metropolitan Area Network) is between a LAN and a WAN in size. It covers a **city** or a **metropolitan area**. Internet Service Providers (ISPs) often operate MANs to provide internet service to a city.

**Example**: The public Wi-Fi network covering the downtown area of a city is a MAN.

## PAN — Personal Area Network

A **PAN** (Personal Area Network) is the smallest type. It connects devices that belong to **one person**, usually within a range of a few meters.

**Examples**:
- Your phone connected to your wireless headphones via **Bluetooth**
- Your smartwatch connected to your phone
- Your laptop connected to a wireless keyboard

## Other Network Types

| Type | Name | Range | Example |
|------|------|-------|---------|
| **WLAN** | Wireless LAN | Building | Office Wi-Fi |
| **SAN** | Storage Area Network | Data center | Server storage systems |
| **VPN** | Virtual Private Network | Any distance | Secure remote work connections |

## VPN — A Special Case

A **VPN** (Virtual Private Network) is not a physical network. Instead, it creates a **secure, encrypted tunnel** over an existing network (usually the internet). VPNs are essential for **cybersecurity** because they:

- Protect data from hackers when using public Wi-Fi
- Allow employees to **securely access** company networks from home
- Hide your real location and IP address

In the nearshoring industry, engineers often use VPNs to connect to their company's main servers in the United States while working from offices in Mexico.

## Network Topologies

The way devices are arranged and connected in a network is called its **topology**. Common topologies include:

- **Star**: All devices connect to a central switch. Most office LANs use this.
- **Mesh**: Every device connects to every other device. Very reliable but expensive. Used in smart networks.
- **Bus**: All devices share a single cable. Older technology, rarely used today.
- **Ring**: Devices connect in a circle. Used in some industrial networks.

Modern smart networks often use a **hybrid topology** — a combination of two or more topologies designed for the best performance and reliability.

---

> **Key Takeaway**: Networks are classified by size (PAN → LAN → MAN → WAN). Understanding these categories helps engineers design and manage the right network for each situation.
`,
                        vocabulary: [
                            { en: "LAN (Local Area Network)", es: "Red de Área Local", definition: "A network covering a small area like an office or home" },
                            { en: "WAN (Wide Area Network)", es: "Red de Área Amplia", definition: "A network covering a large geographic area" },
                            { en: "MAN (Metropolitan Area Network)", es: "Red de Área Metropolitana", definition: "A network covering a city or metropolitan area" },
                            { en: "PAN (Personal Area Network)", es: "Red de Área Personal", definition: "A very small network for one person's devices" },
                            { en: "VPN (Virtual Private Network)", es: "Red Privada Virtual", definition: "A secure, encrypted connection over the internet" },
                            { en: "Topology", es: "Topología", definition: "The physical or logical arrangement of devices in a network" },
                            { en: "Bandwidth", es: "Ancho de banda", definition: "The maximum amount of data a network can transfer" },
                            { en: "Mbps / Gbps", es: "Mbps / Gbps", definition: "Megabits/Gigabits per second — units of data transfer speed" },
                            { en: "Ethernet", es: "Ethernet", definition: "A wired networking technology using cables" },
                            { en: "Bluetooth", es: "Bluetooth", definition: "A wireless technology for short-range connections" },
                            { en: "Encrypted", es: "Cifrado / Encriptado", definition: "Data that is coded so only authorized people can read it" },
                            { en: "Nearshoring", es: "Nearshoring", definition: "Outsourcing business operations to a nearby country" }
                        ],
                        questions: [
                            { q: "Which type of network covers the smallest area?", options: ["LAN", "WAN", "PAN", "MAN"], answer: 2 },
                            { q: "What is the internet classified as?", options: ["A LAN", "A PAN", "The largest WAN", "A MAN"], answer: 2 },
                            { q: "What does a VPN do?", options: ["Makes the internet faster", "Creates a secure tunnel over the internet", "Replaces Wi-Fi", "Blocks all network traffic"], answer: 1 },
                            { q: "In a Star topology, all devices connect to:", options: ["Each other directly", "A single cable", "A central switch", "The internet"], answer: 2 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 2: Network Protocols and Communication
            // -----------------------------------------------------------------
            {
                id: "cyber-m2",
                title: "Network Protocols and Communication",
                titleES: "Protocolos de Red y Comunicación",
                icon: "fa-solid fa-server",
                readings: [
                    {
                        id: "cyber-m2-r1",
                        title: "How Devices Communicate: The OSI Model",
                        duration: "10 min",
                        content: `
# How Devices Communicate: The OSI Model

When you send a message from your phone to a friend's computer, the data passes through many different processes before it arrives. Engineers use a model called the **OSI Model** to understand and organize these processes.

## What Is the OSI Model?

The **OSI Model** (Open Systems Interconnection Model) is a **framework** that divides network communication into **seven layers**. Each layer has a specific job. Think of it like sending a letter: you write the message, put it in an envelope, add the address, and give it to the postal service. Each step is a different "layer."

## The Seven Layers (Simplified)

Let's look at each layer from bottom to top:

### Layer 1 — Physical Layer
This is the **hardware** — the actual cables, connectors, and wireless signals that carry data as electrical pulses or radio waves.

**Examples**: Ethernet cables, fiber optic cables, Wi-Fi antennas, USB ports.

**In simple terms**: "The road that carries the cars."

### Layer 2 — Data Link Layer
This layer organizes data into **frames** and ensures reliable delivery between two directly connected devices. It uses **MAC addresses** (Media Access Control) — unique hardware identifiers burned into every network device.

**Examples**: Switches operate at this layer. Your Wi-Fi card has a MAC address.

**In simple terms**: "The traffic lights and lane markings on the road."

### Layer 3 — Network Layer
This layer handles **routing** — finding the best path for data to travel from source to destination across multiple networks. It uses **IP addresses**.

**Examples**: Routers operate at this layer. Every device on the internet has an IP address.

**In simple terms**: "The GPS that finds the best route."

### Layer 4 — Transport Layer
This layer ensures data arrives **completely and in order**. It breaks data into **segments** and numbers them. If a segment is lost, it requests it again.

The two main protocols at this layer are:
- **TCP** (Transmission Control Protocol): Reliable, ensures every packet arrives. Used for web pages, email.
- **UDP** (User Datagram Protocol): Faster but less reliable. Used for video streaming, online gaming.

**In simple terms**: "The delivery person who checks that all packages arrived."

### Layer 5 — Session Layer
This layer manages **sessions** — the conversations between devices. It starts, maintains, and closes connections between applications.

**In simple terms**: "Starting and ending a phone call."

### Layer 6 — Presentation Layer
This layer handles **data formatting**, **encryption**, and **compression**. It translates data into a format the application can understand.

**Examples**: Converting an image from JPEG to PNG, encrypting data with SSL/TLS.

**In simple terms**: "The translator who makes sure both people speak the same language."

### Layer 7 — Application Layer
This is the layer closest to the **user**. It includes the applications and services people interact with directly.

**Examples**: Web browsers (HTTP/HTTPS), email (SMTP), file transfer (FTP).

**In simple terms**: "The actual conversation — the words you say on the phone."

## A Memory Trick

Engineers use this phrase to remember the layers (from Layer 1 to 7):

> **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

(Physical → Data Link → Network → Transport → Session → Presentation → Application)

## Why Does This Matter for Cybersecurity?

Different **cyber attacks** target different layers of the OSI model:

| Layer | Attack Example |
|-------|---------------|
| Layer 1 | Cable tapping (physically intercepting data) |
| Layer 2 | MAC spoofing (faking a device's identity) |
| Layer 3 | IP spoofing (faking an IP address) |
| Layer 4 | SYN flood (overwhelming a server with connection requests) |
| Layer 7 | SQL injection, phishing (attacking applications directly) |

Understanding the OSI model helps cybersecurity professionals identify **where** an attack is happening and **how** to defend against it.

---

> **Key Takeaway**: The OSI model organizes communication into 7 layers. Each layer has a specific function, and cybersecurity threats can target any layer.
`,
                        vocabulary: [
                            { en: "OSI Model", es: "Modelo OSI", definition: "A 7-layer framework for understanding network communication" },
                            { en: "Frame", es: "Trama", definition: "A unit of data at the Data Link layer" },
                            { en: "MAC Address", es: "Dirección MAC", definition: "A unique hardware identifier for network devices" },
                            { en: "Routing", es: "Enrutamiento", definition: "The process of finding the best path for data" },
                            { en: "TCP", es: "TCP", definition: "Reliable protocol that ensures all data arrives correctly" },
                            { en: "UDP", es: "UDP", definition: "Fast protocol that doesn't guarantee delivery" },
                            { en: "Session", es: "Sesión", definition: "A connection between two communicating devices" },
                            { en: "Encryption", es: "Cifrado", definition: "The process of converting data into unreadable code for security" },
                            { en: "HTTP / HTTPS", es: "HTTP / HTTPS", definition: "Protocol for web pages. S = Secure (encrypted)" },
                            { en: "Fiber Optic", es: "Fibra Óptica", definition: "Cable that transmits data as light pulses, very fast" },
                            { en: "Spoofing", es: "Suplantación", definition: "Faking an identity (IP, MAC, email) to deceive" }
                        ],
                        questions: [
                            { q: "How many layers does the OSI model have?", options: ["4", "5", "7", "10"], answer: 2 },
                            { q: "Which layer handles routing and IP addresses?", options: ["Physical", "Data Link", "Network", "Transport"], answer: 2 },
                            { q: "What is the difference between TCP and UDP?", options: ["TCP is wireless, UDP is wired", "TCP is reliable, UDP is faster but less reliable", "They are the same", "TCP is for video, UDP is for email"], answer: 1 },
                            { q: "At which layer do web browsers operate?", options: ["Layer 1", "Layer 4", "Layer 5", "Layer 7"], answer: 3 }
                        ]
                    },
                    {
                        id: "cyber-m2-r2",
                        title: "IP Addresses and DNS: The Internet's Address System",
                        duration: "10 min",
                        content: `
# IP Addresses and DNS: The Internet's Address System

Every device connected to a network needs a unique **address** so other devices can find it and send data to it. This address is called an **IP address**.

## What Is an IP Address?

An **IP address** (Internet Protocol address) is a **number** assigned to every device on a network. It works like a postal address for your home — it tells the network exactly where to deliver data.

There are two versions of IP addresses in use today:

### IPv4 (Internet Protocol version 4)

IPv4 addresses look like this: **192.168.1.100**

They are made up of **four numbers** separated by dots. Each number can be from 0 to 255. This gives approximately **4.3 billion** possible addresses.

This sounds like a lot, but with billions of devices worldwide (phones, computers, smart TVs, IoT sensors), we have **run out** of IPv4 addresses.

### IPv6 (Internet Protocol version 6)

IPv6 addresses look like this: **2001:0db8:85a3:0000:0000:8a2e:0370:7334**

IPv6 uses **hexadecimal numbers** (0-9 and a-f) and provides approximately **340 undecillion** (3.4 × 10³⁸) addresses — enough for every grain of sand on Earth to have its own address.

The transition from IPv4 to IPv6 is gradual. Many networks today use both.

## Public vs. Private IP Addresses

Not all IP addresses are equal:

- **Public IP address**: This is your address on the **internet**. It is unique globally. Your Internet Service Provider (ISP) assigns it to your router.

- **Private IP address**: This is your address within your **local network** (LAN). Devices inside the same network use private addresses to communicate with each other.

Common private IP ranges:
- **10.0.0.0** — 10.255.255.255
- **172.16.0.0** — 172.31.255.255
- **192.168.0.0** — 192.168.255.255

Your router uses a technology called **NAT** (Network Address Translation) to translate between private and public addresses. This is why multiple devices in your home can share one public IP address.

## DNS — The Internet's Phone Book

IP addresses are numbers, but humans prefer to use names. Nobody wants to type **142.250.80.46** to visit Google. We prefer to type **google.com**.

The **DNS** (Domain Name System) is the service that translates **domain names** (like google.com) into **IP addresses** (like 142.250.80.46).

### How DNS Works (Step by Step):

1. You type **google.com** in your browser.
2. Your device asks a **DNS resolver** (usually provided by your ISP): "What is the IP address for google.com?"
3. The DNS resolver checks its **cache** (memory). If it has the answer, it responds immediately.
4. If not, the resolver asks the **root DNS servers**, which direct it to the **.com servers**, which direct it to **Google's DNS servers**.
5. Google's DNS server responds with the IP address: **142.250.80.46**
6. Your browser connects to that IP address and loads the page.

This entire process usually takes less than **50 milliseconds**.

## DNS and Cybersecurity

DNS is a critical system, and attackers often target it:

- **DNS Spoofing** (DNS Poisoning): An attacker inserts fake DNS records so when you type "mybank.com," you are redirected to a fake website that steals your password.

- **DNS Tunneling**: Attackers hide malicious data inside DNS queries to bypass firewalls.

- **DDoS on DNS**: Overwhelming DNS servers with millions of requests to make websites unreachable.

**DNSSEC** (DNS Security Extensions) is a security upgrade that digitally signs DNS records to prevent spoofing.

## Static vs. Dynamic IP

- **Static IP**: An address that never changes. Used for servers that need to be always reachable at the same address.
- **Dynamic IP**: An address assigned temporarily by a **DHCP** server (Dynamic Host Configuration Protocol). Most home devices use dynamic IPs.

---

> **Key Takeaway**: IP addresses identify devices on a network. DNS translates human-readable names into IP addresses. Both are fundamental systems that cybersecurity professionals must understand and protect.
`,
                        vocabulary: [
                            { en: "IP Address", es: "Dirección IP", definition: "A unique number identifying a device on a network" },
                            { en: "IPv4", es: "IPv4", definition: "Internet Protocol version 4, uses 32-bit addresses (e.g., 192.168.1.1)" },
                            { en: "IPv6", es: "IPv6", definition: "Internet Protocol version 6, uses 128-bit addresses for more devices" },
                            { en: "DNS", es: "Sistema de Nombres de Dominio", definition: "System that translates domain names to IP addresses" },
                            { en: "Domain Name", es: "Nombre de Dominio", definition: "A human-readable website address (e.g., google.com)" },
                            { en: "NAT", es: "Traducción de Direcciones de Red", definition: "Technology that translates private IPs to public IPs" },
                            { en: "ISP", es: "Proveedor de Servicios de Internet", definition: "Company that provides internet access" },
                            { en: "Cache", es: "Caché", definition: "Stored data for quick future access" },
                            { en: "DHCP", es: "DHCP", definition: "Protocol that automatically assigns IP addresses to devices" },
                            { en: "DNSSEC", es: "DNSSEC", definition: "Security extension for DNS to prevent spoofing" },
                            { en: "Static IP", es: "IP Estática", definition: "A fixed, permanent IP address" },
                            { en: "Dynamic IP", es: "IP Dinámica", definition: "A temporary IP address assigned by DHCP" }
                        ],
                        questions: [
                            { q: "Why was IPv6 created?", options: ["IPv4 is too slow", "IPv4 ran out of addresses", "IPv4 is not secure", "IPv6 uses cables instead of Wi-Fi"], answer: 1 },
                            { q: "What does DNS do?", options: ["Protects against viruses", "Assigns IP addresses automatically", "Translates domain names to IP addresses", "Encrypts network traffic"], answer: 2 },
                            { q: "What is DNS Spoofing?", options: ["Making DNS faster", "Inserting fake DNS records to redirect users", "Blocking DNS completely", "Creating new domain names"], answer: 1 },
                            { q: "What type of IP does a web server typically use?", options: ["Dynamic IP", "Private IP", "Static IP", "No IP"], answer: 2 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 3: Introduction to Cybersecurity
            // -----------------------------------------------------------------
            {
                id: "cyber-m3",
                title: "Introduction to Cybersecurity",
                titleES: "Introducción a la Ciberseguridad",
                icon: "fa-solid fa-shield-halved",
                readings: [
                    {
                        id: "cyber-m3-r1",
                        title: "What Is Cybersecurity? The CIA Triad",
                        duration: "10 min",
                        content: `
# What Is Cybersecurity? The CIA Triad

In a world where companies store sensitive data on computers and send it across networks, protecting that data is critical. This is the job of **cybersecurity**.

## Defining Cybersecurity

**Cybersecurity** is the practice of protecting **systems**, **networks**, and **data** from digital attacks, unauthorized access, and damage. It involves a combination of **technology**, **processes**, and **people**.

Cybersecurity is not just about computers. It includes:
- **Network security**: Protecting the network infrastructure
- **Application security**: Making sure software doesn't have vulnerabilities
- **Information security**: Protecting data from unauthorized access
- **Cloud security**: Securing data stored in cloud platforms
- **Operational security**: Deciding who has access to what

## The CIA Triad

The **CIA Triad** is the most important concept in cybersecurity. It stands for:

### C — Confidentiality

**Confidentiality** means that information is only accessible to the people who are **authorized** to see it. Private data should remain private.

**Examples of confidentiality measures**:
- **Passwords** and multi-factor authentication (MFA)
- **Encryption** — converting data into unreadable code
- **Access controls** — only certain employees can open certain files
- **Classification levels** — labeling data as Public, Internal, Confidential, or Secret

**When confidentiality fails**: A hacker steals the database of a bank and publishes customers' credit card numbers online. This is a **data breach**.

### I — Integrity

**Integrity** means that data is **accurate** and has not been **modified** by unauthorized people. You need to trust that the information you receive is the same information that was sent.

**Examples of integrity measures**:
- **Checksums** and **hash functions** — mathematical calculations that verify data hasn't changed
- **Digital signatures** — prove who created or modified a document
- **Version control** — tracking all changes to files
- **Backups** — copies of data in case the original is corrupted

**When integrity fails**: An attacker modifies a financial report before the CEO reads it, changing the numbers to hide fraud.

### A — Availability

**Availability** means that systems and data are **accessible** when authorized users need them. There is no point in having data if nobody can reach it.

**Examples of availability measures**:
- **Redundancy** — having backup servers ready to take over if the main server fails
- **Load balancing** — distributing traffic across multiple servers
- **Disaster recovery plans** — procedures to restore systems after a catastrophe
- **DDoS protection** — defending against attacks that try to overwhelm servers

**When availability fails**: A hospital's computer system goes down during a DDoS attack, and doctors cannot access patient records.

## Balancing the Triad

The three principles sometimes **conflict** with each other:

- Making data extremely confidential (lots of passwords, encryption) can reduce **availability** (users have to wait longer to access it).
- Making data always available (no passwords, no restrictions) reduces **confidentiality**.
- Adding integrity checks (verifying every piece of data) can slow down the system, reducing **availability**.

Good cybersecurity is about finding the right **balance** for each situation.

## Why Cybersecurity Matters for Nearshoring

In the nearshoring industry, Mexican companies often handle **sensitive data** from U.S. clients:
- Customer personal information
- Financial records
- Proprietary technology and trade secrets
- Medical data (HIPAA compliance)

A security breach can result in:
- **Legal penalties** (millions of dollars in fines)
- **Loss of client trust** (the client may move to a competitor)
- **Operational shutdown** (systems locked by ransomware)

This is why cybersecurity professionals are in such **high demand** in the nearshoring market.

---

> **Key Takeaway**: Cybersecurity protects systems, networks, and data. The CIA Triad (Confidentiality, Integrity, Availability) is the foundation of all security decisions.
`,
                        vocabulary: [
                            { en: "Cybersecurity", es: "Ciberseguridad", definition: "The practice of protecting systems, networks, and data from attacks" },
                            { en: "CIA Triad", es: "Tríada CID", definition: "Confidentiality, Integrity, Availability — the three pillars of security" },
                            { en: "Confidentiality", es: "Confidencialidad", definition: "Ensuring data is only accessible to authorized people" },
                            { en: "Integrity", es: "Integridad", definition: "Ensuring data is accurate and unmodified" },
                            { en: "Availability", es: "Disponibilidad", definition: "Ensuring systems and data are accessible when needed" },
                            { en: "Data Breach", es: "Filtración de Datos", definition: "Unauthorized access to sensitive data" },
                            { en: "Authentication", es: "Autenticación", definition: "Verifying the identity of a user or device" },
                            { en: "Access Control", es: "Control de Acceso", definition: "Rules determining who can access what resources" },
                            { en: "Redundancy", es: "Redundancia", definition: "Backup systems ready to take over if the primary fails" },
                            { en: "DDoS", es: "DDoS", definition: "Distributed Denial of Service — overwhelming a server with traffic" },
                            { en: "Hash Function", es: "Función Hash", definition: "Mathematical calculation that creates a unique fingerprint of data" },
                            { en: "Compliance", es: "Cumplimiento", definition: "Following legal and regulatory requirements" }
                        ],
                        questions: [
                            { q: "What does CIA stand for in cybersecurity?", options: ["Central Intelligence Agency", "Computer Information Architecture", "Confidentiality, Integrity, Availability", "Cybersecurity International Alliance"], answer: 2 },
                            { q: "What is a data breach?", options: ["When a hard drive breaks", "Unauthorized access to sensitive data", "When the internet is slow", "When a password is too long"], answer: 1 },
                            { q: "Which CIA principle is about making sure data hasn't been changed?", options: ["Confidentiality", "Integrity", "Availability", "Authentication"], answer: 1 },
                            { q: "Why is cybersecurity important for nearshoring companies?", options: ["To make websites look better", "Because computers are expensive", "They handle sensitive client data from other countries", "To save electricity"], answer: 2 }
                        ]
                    },
                    {
                        id: "cyber-m3-r2",
                        title: "Common Cyber Threats: Malware, Phishing, and Ransomware",
                        duration: "10 min",
                        content: `
# Common Cyber Threats: Malware, Phishing, and Ransomware

To protect a network, you first need to understand the **threats** you're defending against. In this reading, we'll explore the most common types of cyber attacks that affect businesses and individuals.

## Malware — Malicious Software

**Malware** (short for "malicious software") is any software designed to **harm**, **exploit**, or gain **unauthorized access** to a computer system. Malware comes in many forms:

### Virus
A **virus** is malware that **attaches itself** to a legitimate file or program. When the user opens the infected file, the virus activates and spreads to other files. Like a biological virus, it needs a "host" to survive.

**How it spreads**: Email attachments, infected USB drives, downloaded software.

### Worm
A **worm** is similar to a virus, but it can **spread on its own** across networks without needing a human to open a file. Worms exploit vulnerabilities in operating systems to move from device to device automatically.

**Famous example**: The **WannaCry** worm (2017) infected over 200,000 computers in 150 countries in just a few days.

### Trojan Horse
A **Trojan** (named after the Greek myth) is malware that **disguises itself** as legitimate software. The user thinks they're installing a useful program, but the Trojan secretly installs malicious code.

**Example**: A free "game" that secretly records your keystrokes and sends your passwords to an attacker.

### Spyware
**Spyware** is software that **secretly monitors** your activities — which websites you visit, what you type, even your webcam. It sends this information to the attacker.

### Adware
**Adware** is software that displays **unwanted advertisements** on your computer. While not always dangerous, it slows down your system and can be a gateway for more serious malware.

## Phishing — The Art of Deception

**Phishing** is a **social engineering** attack where the attacker pretends to be a trusted person or organization to trick you into revealing sensitive information.

### How Phishing Works:

1. You receive an email that looks like it's from your bank: "URGENT: Your account has been compromised. Click here to verify your identity."
2. The link takes you to a **fake website** that looks exactly like your bank's real website.
3. You enter your username and password.
4. The attacker now has your **credentials** and can access your real bank account.

### Types of Phishing:

| Type | Description |
|------|-------------|
| **Email Phishing** | Mass emails sent to thousands of people |
| **Spear Phishing** | Targeted at a specific person using personal information |
| **Whaling** | Targeted at high-level executives (the "big fish") |
| **Smishing** | Phishing via SMS text messages |
| **Vishing** | Phishing via voice calls |

### How to Identify Phishing:

- Check the sender's **email address** carefully (misspellings like "g00gle.com")
- Look for **urgency** and **fear tactics** ("Act now or your account will be closed!")
- **Hover over links** before clicking to see the real URL
- Legitimate companies never ask for passwords via email
- Look for **grammar mistakes** and odd formatting

## Ransomware — Your Files for Ransom

**Ransomware** is a type of malware that **encrypts** all your files and demands **payment** (a ransom) to unlock them. If you don't pay, your data is lost — or the attacker threatens to publish it.

### How Ransomware Works:

1. The victim clicks a malicious link or opens an infected attachment.
2. The ransomware silently encrypts all files on the computer (and sometimes the entire network).
3. A message appears: "Your files have been encrypted. Pay 2 Bitcoin ($60,000) within 72 hours or your data will be deleted."
4. The victim must decide whether to **pay** (no guarantee the attacker will unlock the files) or **restore from backups** (if they have them).

### Ransomware in the Real World:

- **Colonial Pipeline** (2021): A ransomware attack shut down the largest fuel pipeline in the U.S. for six days. The company paid $4.4 million in ransom.
- **Costa Rica** (2022): The Conti ransomware group attacked the government of Costa Rica, forcing the country to declare a national emergency.

### How to Protect Against Ransomware:

- Keep **regular backups** of all important data (offline, disconnected from the network)
- Keep all software and systems **up to date** with security patches
- Train employees to **recognize phishing** emails
- Use **endpoint protection** software (advanced antivirus)
- Implement **network segmentation** so ransomware can't spread to the entire network

---

> **Key Takeaway**: Malware, phishing, and ransomware are the most common cyber threats. Understanding how they work is the first step to defending against them.
`,
                        vocabulary: [
                            { en: "Malware", es: "Software Malicioso", definition: "Software designed to harm or exploit computer systems" },
                            { en: "Virus", es: "Virus", definition: "Malware that attaches to files and spreads when opened" },
                            { en: "Worm", es: "Gusano", definition: "Self-replicating malware that spreads across networks automatically" },
                            { en: "Trojan", es: "Troyano", definition: "Malware disguised as legitimate software" },
                            { en: "Phishing", es: "Phishing / Suplantación", definition: "Tricking users into revealing passwords by impersonating trusted entities" },
                            { en: "Social Engineering", es: "Ingeniería Social", definition: "Manipulating people psychologically to obtain information" },
                            { en: "Ransomware", es: "Ransomware / Secuestro de datos", definition: "Malware that encrypts files and demands payment" },
                            { en: "Credentials", es: "Credenciales", definition: "Username and password used to access a system" },
                            { en: "Spear Phishing", es: "Phishing Dirigido", definition: "Phishing targeted at a specific individual" },
                            { en: "Endpoint", es: "Punto Final / Endpoint", definition: "Any device connected to a network (computer, phone)" },
                            { en: "Patch", es: "Parche", definition: "A software update that fixes security vulnerabilities" },
                            { en: "Backup", es: "Respaldo / Copia de seguridad", definition: "A copy of data stored separately for recovery" }
                        ],
                        questions: [
                            { q: "What is the difference between a virus and a worm?", options: ["There is no difference", "A virus needs a host file; a worm spreads on its own", "A worm is more dangerous than a virus", "Viruses only affect phones"], answer: 1 },
                            { q: "What is the goal of phishing?", options: ["To encrypt your files", "To slow down your computer", "To trick you into revealing your passwords", "To install new software"], answer: 2 },
                            { q: "What should you do if you receive a ransomware attack?", options: ["Pay the ransom immediately", "Turn off the computer and never use it again", "Restore from backups and report the incident", "Delete all your emails"], answer: 2 },
                            { q: "Which type of phishing targets high-level executives?", options: ["Smishing", "Vishing", "Whaling", "Email Phishing"], answer: 2 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 4: Network Security Tools
            // -----------------------------------------------------------------
            {
                id: "cyber-m4",
                title: "Network Security Tools and Defenses",
                titleES: "Herramientas y Defensas de Seguridad de Red",
                icon: "fa-solid fa-lock",
                readings: [
                    {
                        id: "cyber-m4-r1",
                        title: "Firewalls, IDS, and Encryption",
                        duration: "10 min",
                        content: `
# Firewalls, IDS, and Encryption

Now that we understand the threats, let's study the **tools** cybersecurity professionals use to defend networks. These are the essential defense mechanisms every network engineer must know.

## Firewalls — The Network's Security Gate

A **firewall** is a security device (hardware or software) that **monitors and controls** network traffic based on predefined security **rules**. It acts as a barrier between a trusted internal network and untrusted external networks (like the internet).

### How a Firewall Works:

The firewall examines each **packet** of data and decides whether to **allow** it through or **block** it based on:

- **Source IP address** — Where is the data coming from?
- **Destination IP address** — Where is it going?
- **Port number** — What service is it using? (Port 80 = HTTP, Port 443 = HTTPS, Port 22 = SSH)
- **Protocol** — Is it TCP, UDP, or something else?

### Types of Firewalls:

| Type | Description | Use Case |
|------|-------------|----------|
| **Packet Filter** | Examines individual packets based on IP/port rules | Basic protection |
| **Stateful Inspection** | Tracks active connections and context | Most modern firewalls |
| **Application Layer** | Inspects the actual content of the data | Blocking specific web content |
| **Next-Gen (NGFW)** | Combines all above + IDS + deep packet inspection | Enterprise networks |

**Analogy**: A firewall is like the security guard at a building entrance. The guard checks your ID (IP address), your purpose (port/protocol), and decides whether to let you in.

## IDS and IPS — Detecting and Preventing Intrusions

While firewalls control access, **IDS** and **IPS** systems focus on detecting suspicious activity:

### IDS — Intrusion Detection System

An IDS **monitors** network traffic and **alerts** administrators when it detects something suspicious. It does NOT block the traffic — it only reports it.

Think of an IDS like a **security camera**. It watches everything and sends an alert if something looks wrong, but a human must respond.

### IPS — Intrusion Prevention System

An IPS does everything an IDS does, but it can also **automatically block** the suspicious traffic. It's a security camera with an automatic door lock.

### Detection Methods:

- **Signature-based**: Compares traffic to a database of known attack patterns. Fast but can't detect new, unknown attacks.
- **Anomaly-based**: Learns what "normal" traffic looks like and flags anything unusual. Can detect new attacks but may produce **false positives** (false alarms).

## Encryption — Locking Data with Math

**Encryption** is the process of converting readable data (**plaintext**) into unreadable code (**ciphertext**) using a mathematical **algorithm** and a **key**. Only someone with the correct key can convert the ciphertext back to plaintext (**decryption**).

### Symmetric Encryption

Both the sender and receiver use the **same key** to encrypt and decrypt data.

- **Fast** and efficient for large amounts of data
- **Problem**: How do you securely share the key with the other person?
- **Example algorithm**: AES (Advanced Encryption Standard) — used to protect top-secret government data

### Asymmetric Encryption (Public-Key Cryptography)

Uses **two different keys**:
- A **public key** (everyone can see it) — used to encrypt data
- A **private key** (kept secret) — used to decrypt data

- **Slower** than symmetric encryption
- **Solves the key-sharing problem** — you can publish your public key openly
- **Example algorithm**: RSA (Rivest–Shamir–Adleman)

### Encryption in Practice:

| Where | Protocol | Type |
|-------|----------|------|
| **Websites** | HTTPS (TLS/SSL) | Asymmetric + Symmetric |
| **Wi-Fi** | WPA3 | Symmetric |
| **Email** | PGP / S/MIME | Asymmetric |
| **VPN** | IPsec / WireGuard | Both |
| **Messaging** | Signal Protocol | Asymmetric |

When you see the **lock icon** 🔒 in your browser, it means the connection is encrypted with TLS — your data is protected between your device and the server.

## Defense in Depth

Good cybersecurity uses **multiple layers** of defense — this strategy is called **Defense in Depth**. No single tool is enough:

1. **Firewall** → Controls what enters the network
2. **IDS/IPS** → Detects suspicious activity
3. **Encryption** → Protects data even if intercepted
4. **Antivirus** → Detects malware on individual devices
5. **Training** → Educates users to recognize threats
6. **Backups** → Ensures data recovery if everything else fails

---

> **Key Takeaway**: Firewalls control access, IDS/IPS detect threats, and encryption protects data. A strong defense uses all three together in a "Defense in Depth" strategy.
`,
                        vocabulary: [
                            { en: "Firewall", es: "Cortafuegos / Firewall", definition: "A device that monitors and filters network traffic" },
                            { en: "IDS", es: "Sistema de Detección de Intrusos", definition: "System that detects and alerts about suspicious activity" },
                            { en: "IPS", es: "Sistema de Prevención de Intrusos", definition: "System that detects AND blocks suspicious activity" },
                            { en: "Encryption", es: "Cifrado", definition: "Converting data into unreadable code using a key" },
                            { en: "Plaintext", es: "Texto Plano", definition: "Readable, unencrypted data" },
                            { en: "Ciphertext", es: "Texto Cifrado", definition: "Encrypted, unreadable data" },
                            { en: "Public Key", es: "Clave Pública", definition: "Key shared openly, used to encrypt data" },
                            { en: "Private Key", es: "Clave Privada", definition: "Secret key used to decrypt data" },
                            { en: "AES", es: "AES", definition: "Advanced Encryption Standard — a symmetric algorithm" },
                            { en: "TLS/SSL", es: "TLS/SSL", definition: "Protocols that encrypt web traffic (HTTPS)" },
                            { en: "False Positive", es: "Falso Positivo", definition: "A security alert triggered by non-malicious activity" },
                            { en: "Defense in Depth", es: "Defensa en Profundidad", definition: "Using multiple layers of security" }
                        ],
                        questions: [
                            { q: "What does a firewall examine to decide whether to allow traffic?", options: ["Only the user's name", "Source/destination IP, port, and protocol", "The computer's brand", "The time of day only"], answer: 1 },
                            { q: "What is the main difference between IDS and IPS?", options: ["IDS is hardware, IPS is software", "IDS only detects; IPS detects and blocks", "IPS is older technology", "There is no difference"], answer: 1 },
                            { q: "In asymmetric encryption, which key is used to encrypt data?", options: ["Private key", "Public key", "Both keys together", "No key is needed"], answer: 1 },
                            { q: "What does the lock icon in your browser mean?", options: ["The website is popular", "The connection is encrypted with TLS", "The website has no viruses", "The website is a government site"], answer: 1 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 5: Security Best Practices
            // -----------------------------------------------------------------
            {
                id: "cyber-m5",
                title: "Security Best Practices in the Workplace",
                titleES: "Mejores Prácticas de Seguridad en el Trabajo",
                icon: "fa-solid fa-user-shield",
                readings: [
                    {
                        id: "cyber-m5-r1",
                        title: "Password Security and Multi-Factor Authentication",
                        duration: "10 min",
                        content: `
# Password Security and Multi-Factor Authentication

The simplest and most common security vulnerability is a **weak password**. In this reading, you'll learn how to create strong passwords and why passwords alone are not enough.

## The Problem with Passwords

According to security research:
- **81%** of data breaches involve weak or stolen passwords
- The most common password in 2025 is still **"123456"**
- The average person has **100+ online accounts** but uses only **5-7 unique passwords**

Hackers use several methods to crack passwords:

### Brute Force Attack
The attacker tries **every possible combination** of characters until finding the right one. A 4-digit PIN has only 10,000 possibilities — a computer can try all of them in seconds.

### Dictionary Attack
The attacker uses a **list of common words and passwords** (like "password," "admin," "love2024") to guess credentials.

### Credential Stuffing
When a website is breached and passwords are leaked, attackers try those same username/password combinations on **other websites** (because people reuse passwords).

## Creating Strong Passwords

A strong password should be:
- **At least 12 characters** long
- A mix of **uppercase** letters, **lowercase** letters, **numbers**, and **special characters** (!@#$%^&*)
- **Not a dictionary word** or common phrase
- **Unique** for each account

### The Passphrase Method

Instead of remembering complex strings like "xK9#mQ2$pL", use a **passphrase** — a sequence of random words that is easy to remember but hard to guess:

> **"Purple-Cactus-Runs-Toward-42-Moons"**

This passphrase is 37 characters long, contains uppercase, lowercase, numbers, special characters, and would take **centuries** to brute-force crack.

### Password Managers

A **password manager** is software that:
- **Generates** strong, unique passwords for every account
- **Stores** all passwords in an encrypted **vault**
- **Auto-fills** login forms
- You only need to remember **one master password**

Popular password managers: Bitwarden, 1Password, LastPass, KeePass.

## Multi-Factor Authentication (MFA)

Even the strongest password can be stolen through phishing. This is why we use **MFA** — requiring **two or more** forms of identification:

### The Three Factors:

| Factor | What It Is | Examples |
|--------|-----------|----------|
| **Something you know** | Knowledge | Password, PIN, security question |
| **Something you have** | Possession | Phone (SMS code), hardware token, authenticator app |
| **Something you are** | Biometrics | Fingerprint, face recognition, iris scan |

### Common MFA Methods:

1. **SMS Code**: A 6-digit code sent to your phone via text message. Better than nothing, but **vulnerable** to SIM-swapping attacks.

2. **Authenticator App**: Apps like Google Authenticator or Microsoft Authenticator generate a **time-based code** (TOTP) that changes every 30 seconds. More secure than SMS.

3. **Hardware Security Key**: A physical device (like YubiKey) that you plug into your computer or tap on your phone. The **most secure** method, virtually immune to phishing.

4. **Biometric**: Your fingerprint, face, or voice. Convenient but cannot be changed if compromised.

### MFA in the Workplace

In a professional environment, especially in nearshoring:
- **Email accounts** should always have MFA enabled
- **VPN access** to client networks requires MFA
- **Cloud platforms** (AWS, Azure, Google Cloud) should use MFA for admin accounts
- **Code repositories** (GitHub, GitLab) should require MFA for all developers

## The Zero Trust Model

Modern cybersecurity follows the **Zero Trust** principle: **"Never trust, always verify."**

In a Zero Trust environment:
- No device or user is automatically trusted, even inside the company network
- Every access request is **verified** with authentication
- Users have the **minimum access** they need to do their job (Principle of Least Privilege)
- All network activity is **logged and monitored**

---

> **Key Takeaway**: Strong passwords and MFA are the first line of defense. Use a password manager, enable MFA everywhere, and follow Zero Trust principles.
`,
                        vocabulary: [
                            { en: "Brute Force Attack", es: "Ataque de Fuerza Bruta", definition: "Trying every possible password combination" },
                            { en: "Dictionary Attack", es: "Ataque de Diccionario", definition: "Using a list of common words to guess passwords" },
                            { en: "Credential Stuffing", es: "Relleno de Credenciales", definition: "Using stolen passwords from one site on other sites" },
                            { en: "Passphrase", es: "Frase de Contraseña", definition: "A long password made of multiple random words" },
                            { en: "Password Manager", es: "Gestor de Contraseñas", definition: "Software that generates and stores strong passwords" },
                            { en: "MFA", es: "Autenticación Multifactor", definition: "Requiring two or more forms of ID to access an account" },
                            { en: "TOTP", es: "TOTP", definition: "Time-based One-Time Password — code that changes every 30 seconds" },
                            { en: "Biometrics", es: "Biometría", definition: "Using physical characteristics (fingerprint, face) for identification" },
                            { en: "Zero Trust", es: "Confianza Cero", definition: "Security model where nothing is automatically trusted" },
                            { en: "Least Privilege", es: "Privilegio Mínimo", definition: "Giving users only the access they need, nothing more" },
                            { en: "Vault", es: "Bóveda", definition: "Encrypted storage for sensitive data like passwords" }
                        ],
                        questions: [
                            { q: "What is the most secure MFA method?", options: ["SMS code", "Security question", "Hardware security key", "Email verification"], answer: 2 },
                            { q: "What does 'Zero Trust' mean?", options: ["Don't trust any software", "Never trust, always verify every access request", "Don't use the internet", "Trust only Microsoft products"], answer: 1 },
                            { q: "Why is 'password123' a bad password?", options: ["It's too long", "It uses numbers", "It's a common word easily guessed in a dictionary attack", "It contains special characters"], answer: 2 },
                            { q: "What does a password manager do?", options: ["Blocks hackers", "Generates, stores, and auto-fills strong unique passwords", "Replaces your keyboard", "Sends passwords to your email"], answer: 1 }
                        ]
                    }
                ]
            },

            // -----------------------------------------------------------------
            // MODULE 6: Career Paths in Cybersecurity
            // -----------------------------------------------------------------
            {
                id: "cyber-m6",
                title: "Career Paths in Cybersecurity",
                titleES: "Trayectorias Profesionales en Ciberseguridad",
                icon: "fa-solid fa-briefcase",
                readings: [
                    {
                        id: "cyber-m6-r1",
                        title: "Cybersecurity Careers and Certifications",
                        duration: "10 min",
                        content: `
# Cybersecurity Careers and Certifications

Cybersecurity is one of the **fastest-growing** career fields in the world. According to Cybersecurity Ventures, there will be **3.5 million unfilled cybersecurity jobs** globally by 2025. For professionals in Mexico's nearshoring industry, this represents an enormous opportunity.

## Entry-Level Roles

### Security Analyst (SOC Analyst)

A **Security Operations Center (SOC) Analyst** is usually the first cybersecurity role. SOC analysts work in shifts, monitoring security alerts 24/7.

**Responsibilities**:
- Monitor security dashboards and **SIEM** (Security Information and Event Management) tools
- Investigate **alerts** and determine if they are real threats or false positives
- Escalate confirmed incidents to senior analysts
- Write incident reports

**Average salary (Mexico nearshoring)**: $25,000 - $45,000 USD/year
**Required skills**: Networking fundamentals, log analysis, basic scripting

### IT Support / Help Desk (Security Focus)

Many cybersecurity professionals start in **IT support**, helping users with technical problems while learning about security tools and policies.

## Mid-Level Roles

### Penetration Tester (Ethical Hacker)

A **penetration tester** (or "pen tester") is hired by companies to **hack their own systems** — legally. They find vulnerabilities before real attackers do.

**Responsibilities**:
- Conduct **vulnerability assessments** and penetration tests
- Write detailed reports explaining each vulnerability and how to fix it
- Test web applications, networks, and physical security
- Stay up to date with the latest attack techniques

**Average salary**: $50,000 - $90,000 USD/year

### Security Engineer

A **security engineer** designs and implements the security infrastructure — firewalls, IDS/IPS, VPNs, encryption systems.

**Responsibilities**:
- Configure and maintain security tools
- Design secure network architectures
- Respond to and remediate security incidents
- Automate security processes with scripts

**Average salary**: $55,000 - $100,000 USD/year

## Senior / Specialized Roles

### Security Architect
Designs the overall security strategy for an organization. Requires 8-10+ years of experience.

### Incident Response Manager
Leads the team that responds to active cyber attacks. Works under extreme pressure and time constraints.

### Chief Information Security Officer (CISO)
The executive responsible for all cybersecurity in an organization. Reports directly to the CEO.

## Key Certifications

Certifications prove your knowledge and significantly increase your earning potential:

| Certification | Organization | Level | Focus |
|--------------|-------------|-------|-------|
| **CompTIA Security+** | CompTIA | Entry | General security fundamentals |
| **CEH** (Certified Ethical Hacker) | EC-Council | Mid | Penetration testing |
| **CISSP** (Certified Information Systems Security Professional) | ISC² | Senior | Security management & strategy |
| **OSCP** (Offensive Security Certified Professional) | OffSec | Mid-Senior | Hands-on penetration testing |
| **CCNA Security** | Cisco | Entry-Mid | Network security (Cisco devices) |

### Recommended Path for Mexico Nearshoring:

1. **Start**: CompTIA Network+ → CompTIA Security+
2. **Specialize**: CEH or CCNA Security
3. **Advance**: CISSP or OSCP

## Skills in Demand (Nearshoring Market)

Companies hiring cybersecurity professionals for nearshoring operations especially value:

- **English proficiency** (B1-B2 minimum) — most tools, documentation, and client communication are in English
- **Cloud security** (AWS, Azure, Google Cloud)
- **SIEM tools** (Splunk, QRadar, Microsoft Sentinel)
- **Scripting** (Python, Bash, PowerShell)
- **Compliance knowledge** (SOC 2, ISO 27001, HIPAA, GDPR)
- **Incident response** experience

## The Importance of English

In the cybersecurity field, English is not optional — it is **essential**:

- All major **security tools** have English interfaces
- **CVE reports** (Common Vulnerabilities and Exposures) are published in English
- **Incident reports** for U.S. clients must be written in English
- **Certifications** exams are primarily in English
- **Security conferences** (DEF CON, Black Hat, RSA) are conducted in English

This is exactly why you are taking this ESP course — combining cybersecurity knowledge with English proficiency makes you a **highly competitive** candidate in the nearshoring market.

---

> **Key Takeaway**: Cybersecurity offers excellent career opportunities, especially in Mexico's nearshoring industry. Start with foundational certifications, develop strong English skills, and specialize in high-demand areas like cloud security and incident response.
`,
                        vocabulary: [
                            { en: "SOC (Security Operations Center)", es: "Centro de Operaciones de Seguridad", definition: "A team/facility that monitors security 24/7" },
                            { en: "SIEM", es: "SIEM", definition: "Software that collects and analyzes security logs from all systems" },
                            { en: "Penetration Testing", es: "Pruebas de Penetración", definition: "Legally hacking systems to find vulnerabilities" },
                            { en: "Vulnerability", es: "Vulnerabilidad", definition: "A weakness in a system that can be exploited" },
                            { en: "Ethical Hacker", es: "Hacker Ético", definition: "A security professional who hacks with permission to find weaknesses" },
                            { en: "Incident Response", es: "Respuesta a Incidentes", definition: "The process of handling a cyber attack" },
                            { en: "CISO", es: "Director de Seguridad de la Información", definition: "Chief Information Security Officer — top security executive" },
                            { en: "Certification", es: "Certificación", definition: "Official proof of professional knowledge and skills" },
                            { en: "Compliance", es: "Cumplimiento Normativo", definition: "Following laws and regulations (SOC 2, HIPAA, GDPR)" },
                            { en: "CVE", es: "CVE", definition: "Common Vulnerabilities and Exposures — public database of known security flaws" },
                            { en: "Remediate", es: "Remediar", definition: "To fix a security problem" }
                        ],
                        questions: [
                            { q: "What is the usual first cybersecurity job?", options: ["CISO", "Security Architect", "SOC Analyst", "Penetration Tester"], answer: 2 },
                            { q: "What does a penetration tester do?", options: ["Builds firewalls", "Legally hacks systems to find vulnerabilities", "Manages passwords", "Designs websites"], answer: 1 },
                            { q: "Which certification is recommended for entry-level professionals?", options: ["CISSP", "OSCP", "CompTIA Security+", "CEH"], answer: 2 },
                            { q: "Why is English important in cybersecurity?", options: ["It's not important", "All security tools and reports are primarily in English", "Only for Americans", "English passwords are stronger"], answer: 1 }
                        ]
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // TRACK 2: SEMICONDUCTORS (FULL CONTENT)
    // =========================================================================
    "semiconductors": {
        id: "semiconductors",
        title: "Semiconductores",
        titleEN: "Semiconductor Manufacturing",
        level: "A2-B1",
        status: "full",
        description: "Master the English vocabulary for semiconductor fabrication — from silicon wafers to FinFET transistors. Aligned with Mexico's nearshoring chip manufacturing boom.",
        descriptionES: "Domina el vocabulario en inglés para la fabricación de semiconductores — desde obleas de silicio hasta transistores FinFET.",
        totalModules: 6,
        estimatedHours: 12,
        prerequisites: ["esp-foundation"],
        standard: "CONOCER EC2034",
        modules: [
            {
                id: "semi-m1",
                title: "Introduction to Semiconductors",
                titleES: "Introducción a los Semiconductores",
                icon: "fa-solid fa-microchip",
                readings: [
                    {
                        id: "semi-m1-r1",
                        title: "What Is a Semiconductor?",
                        duration: "10 min",
                        content: `
# What Is a Semiconductor?

Every electronic device you use — your phone, your computer, your car — contains **semiconductors**. These tiny components are the foundation of modern technology. In this reading, you'll learn what semiconductors are, why they matter, and why Mexico is becoming a key player in their manufacturing.

## Three Types of Materials

To understand semiconductors, you first need to know the difference between three types of materials:

### 1. Conductors
**Conductors** are materials that allow electricity to flow through them easily. The electrons in these materials are free to move.

**Examples**: Copper, gold, silver, aluminum.
**Uses**: Wires, cables, circuit board traces.

### 2. Insulators
**Insulators** are materials that **block** the flow of electricity. Their electrons are tightly bound and cannot move freely.

**Examples**: Rubber, glass, plastic, ceramic.
**Uses**: Cable coatings, protective covers, circuit board substrates.

### 3. Semiconductors
**Semiconductors** are materials that fall **between** conductors and insulators. Under certain conditions, they can conduct electricity; under other conditions, they cannot. This ability to **switch** between conducting and not conducting is what makes them incredibly useful.

**Examples**: Silicon (Si), Germanium (Ge), Gallium Arsenide (GaAs).

## Silicon — The King of Semiconductors

**Silicon** is the most widely used semiconductor material. Here's why:

- It is the **second most abundant** element on Earth (found in sand and rocks)
- It has a very useful **crystal structure** (diamond cubic)
- Its electrical properties can be precisely **controlled** by adding other elements (a process called **doping**)
- It works well across a wide range of temperatures

**Fun fact**: Silicon Valley in California got its name because of the many companies that manufactured silicon-based microchips there in the 1970s and 1980s.

## What Do Semiconductors Do?

Semiconductors are used to make:

- **Transistors**: Tiny switches that can turn on and off billions of times per second. Modern processors contain **billions** of transistors.
- **Diodes**: Components that allow electricity to flow in **one direction** only. Used in LED lights, power supplies, and solar panels.
- **Integrated Circuits (ICs / Chips)**: Thousands or millions of transistors combined on a single piece of silicon. These are the "brains" of all electronic devices.
- **Sensors**: Devices that detect temperature, light, pressure, or motion.

## The Semiconductor Manufacturing Process (Overview)

Making a semiconductor chip is one of the most complex manufacturing processes in the world. Here is a simplified overview:

1. **Silicon Purification**: Raw silicon is purified to 99.9999999% purity (called "nine nines").
2. **Crystal Growth**: The purified silicon is grown into a large **single crystal** called an **ingot**.
3. **Wafer Slicing**: The ingot is sliced into thin round discs called **wafers** (typically 300mm in diameter).
4. **Photolithography**: Patterns are projected onto the wafer using **ultraviolet light** to create circuits.
5. **Etching**: Unwanted material is removed chemically or with plasma.
6. **Doping**: Specific areas of the wafer are treated with other elements to change their electrical properties.
7. **Deposition**: Thin layers of different materials are deposited onto the wafer.
8. **Testing**: Each chip on the wafer is tested for defects.
9. **Packaging**: Working chips are cut from the wafer and enclosed in protective packages.

Steps 4-7 are repeated **dozens of times** to build up the many layers of a modern chip. The entire process can take **3-4 months** from start to finish.

## Mexico and the Semiconductor Industry

Mexico is becoming a critical location for semiconductor manufacturing due to:

- **Geographic proximity** to the U.S. (where most chip companies are headquartered)
- A **large, young workforce** with engineering talent
- **USMCA** trade agreement benefits
- Lower costs compared to the U.S. while maintaining quality standards
- Existing automotive and electronics manufacturing infrastructure

Companies like **Intel**, **Texas Instruments**, and **Skyworks** already have operations in Mexico. The nearshoring trend is accelerating investment in semiconductor packaging, testing, and eventually fabrication facilities in cities like **Guadalajara**, **Monterrey**, and **Chihuahua**.

---

> **Key Takeaway**: Semiconductors are materials between conductors and insulators. Silicon is the most important semiconductor. Mexico's nearshoring boom is creating thousands of jobs in semiconductor manufacturing.
`,
                        vocabulary: [
                            { en: "Semiconductor", es: "Semiconductor", definition: "A material that can conduct or block electricity depending on conditions" },
                            { en: "Conductor", es: "Conductor", definition: "A material that allows electricity to flow easily (e.g., copper)" },
                            { en: "Insulator", es: "Aislante", definition: "A material that blocks electricity (e.g., rubber)" },
                            { en: "Silicon (Si)", es: "Silicio", definition: "The most common semiconductor material" },
                            { en: "Transistor", es: "Transistor", definition: "A tiny electronic switch — the building block of all chips" },
                            { en: "Diode", es: "Diodo", definition: "A component that allows current in one direction only" },
                            { en: "Integrated Circuit (IC)", es: "Circuito Integrado", definition: "A chip containing millions of transistors" },
                            { en: "Wafer", es: "Oblea", definition: "A thin disc of silicon used to make chips" },
                            { en: "Ingot", es: "Lingote", definition: "A large cylindrical crystal of purified silicon" },
                            { en: "Doping", es: "Dopaje", definition: "Adding impurities to silicon to change its electrical properties" },
                            { en: "Photolithography", es: "Fotolitografía", definition: "Using light to transfer circuit patterns onto a wafer" },
                            { en: "Etching", es: "Grabado", definition: "Removing material from a wafer using chemicals or plasma" }
                        ],
                        questions: [
                            { q: "Why are semiconductors special?", options: ["They are always conductors", "They can switch between conducting and not conducting", "They are the cheapest material", "They glow in the dark"], answer: 1 },
                            { q: "What is silicon?", options: ["A type of plastic", "The most widely used semiconductor material", "A conductor", "An insulator"], answer: 1 },
                            { q: "What is a wafer?", options: ["A type of chip packaging", "A thin disc of silicon where chips are made", "A testing tool", "A type of wire"], answer: 1 },
                            { q: "Why is Mexico important for the semiconductor industry?", options: ["Mexico invented semiconductors", "It is close to the U.S. with a large engineering workforce", "Silicon is only found in Mexico", "Mexico has the most advanced chip factories"], answer: 1 }
                        ]
                    },
                    {
                        id: "semi-m1-r2",
                        title: "Doping: N-Type and P-Type Semiconductors",
                        duration: "10 min",
                        content: `
# Doping: N-Type and P-Type Semiconductors

Pure silicon is not very useful for electronics because it doesn't conduct electricity well. To make silicon useful, engineers add tiny amounts of other elements — a process called **doping**. This is one of the most fundamental concepts in semiconductor manufacturing.

## Why Doping Is Necessary

A silicon atom has **4 electrons** in its outer shell. In a pure silicon crystal, each atom shares its 4 electrons with 4 neighboring atoms, forming strong **covalent bonds**. This creates a stable structure with very few free electrons, so pure silicon is a poor conductor.

To make silicon conduct electricity, we need to either:
- **Add extra electrons** (negative charge carriers) → **N-Type**
- **Create missing electrons ("holes")** (positive charge carriers) → **P-Type**

## N-Type Semiconductor

To create an **N-Type** ("Negative Type") semiconductor, we add atoms with **5 electrons** in their outer shell, such as:
- **Phosphorus (P)**
- **Arsenic (As)**
- **Antimony (Sb)**

When a phosphorus atom replaces a silicon atom in the crystal, 4 of its electrons form bonds with neighboring silicon atoms. The **5th electron** is free to move — it becomes a **charge carrier**.

Since these free electrons carry a **negative** charge, we call this **N-Type** semiconductor.

The added element (phosphorus) is called a **donor** because it "donates" an extra electron.

## P-Type Semiconductor

To create a **P-Type** ("Positive Type") semiconductor, we add atoms with only **3 electrons** in their outer shell, such as:
- **Boron (B)**
- **Gallium (Ga)**
- **Indium (In)**

When a boron atom replaces a silicon atom, it can only form 3 of the 4 needed bonds. The missing bond creates a **hole** — an empty space where an electron could be. This hole acts as a **positive charge carrier** because electrons from neighboring atoms can "jump" into the hole, effectively making the hole move through the crystal.

The added element (boron) is called an **acceptor** because it "accepts" electrons to fill its holes.

## The P-N Junction — Where the Magic Happens

When you place P-Type silicon next to N-Type silicon, you create a **P-N Junction** — the most important structure in all of electronics.

At the junction:
1. Free electrons from the N-side **diffuse** (spread) across to the P-side
2. Holes from the P-side diffuse to the N-side
3. This creates a **depletion zone** — a thin region with no free charge carriers
4. The depletion zone creates an **electric field** that prevents further diffusion

### Forward Bias (Conducting):
If you connect a battery with the **positive terminal** to the P-side and **negative terminal** to the N-side, the electric field is reduced, and current flows through the junction. The diode is **ON**.

### Reverse Bias (Blocking):
If you reverse the battery connections, the electric field increases, and no current flows. The diode is **OFF**.

This ability to act as a one-way switch for electricity is what makes the P-N junction so useful. It is the basis of:

- **Diodes** — one-way valves for electricity
- **LEDs** (Light Emitting Diodes) — P-N junctions that produce light
- **Solar cells** — P-N junctions that convert light into electricity
- **Transistors** — combinations of P-N junctions that act as switches and amplifiers

## Doping in the Factory

In a semiconductor fabrication plant (**fab**), doping is done using two main methods:

### Ion Implantation
A machine called an **ion implanter** shoots dopant atoms at the silicon wafer at very high speed. The atoms embed themselves into the silicon surface. This method offers **precise control** over the depth and concentration of doping.

### Diffusion
The wafer is heated in a **furnace** (800-1200°C) in the presence of dopant gases. The dopant atoms slowly diffuse into the silicon. This method is simpler but less precise than ion implantation.

## Key Numbers

| Property | Value |
|----------|-------|
| Dopant concentration (typical) | 1 atom per 10 million silicon atoms |
| Silicon atoms in 1 cm³ | ~5 × 10²² |
| Dopant atoms in 1 cm³ | ~5 × 10¹⁵ |
| Depletion zone width | ~0.1 to 1 micrometer |

Even though we add only a **tiny** amount of dopant, it dramatically changes the electrical behavior of silicon.

---

> **Key Takeaway**: Doping adds specific impurities to silicon to create N-Type (extra electrons) or P-Type (holes). The P-N junction created where they meet is the foundation of all electronic devices.
`,
                        vocabulary: [
                            { en: "Doping", es: "Dopaje", definition: "Adding impurity atoms to silicon to control its conductivity" },
                            { en: "N-Type", es: "Tipo N", definition: "Silicon doped with atoms that provide extra electrons" },
                            { en: "P-Type", es: "Tipo P", definition: "Silicon doped with atoms that create holes" },
                            { en: "Electron", es: "Electrón", definition: "A negatively charged subatomic particle" },
                            { en: "Hole", es: "Hueco / Laguna", definition: "An empty space where an electron could be — acts as positive charge" },
                            { en: "Covalent Bond", es: "Enlace Covalente", definition: "A chemical bond formed by sharing electrons" },
                            { en: "Donor", es: "Donador", definition: "An atom (like phosphorus) that donates an extra electron" },
                            { en: "Acceptor", es: "Aceptor", definition: "An atom (like boron) that accepts electrons" },
                            { en: "P-N Junction", es: "Unión P-N", definition: "The boundary between P-Type and N-Type silicon" },
                            { en: "Depletion Zone", es: "Zona de Agotamiento", definition: "The region at a P-N junction with no free carriers" },
                            { en: "Forward Bias", es: "Polarización Directa", definition: "Voltage applied to make a diode conduct" },
                            { en: "Ion Implantation", es: "Implantación de Iones", definition: "Shooting dopant atoms into silicon at high speed" },
                            { en: "Fab (Fabrication Plant)", es: "Fábrica / Planta de Fabricación", definition: "A factory where semiconductor chips are manufactured" }
                        ],
                        questions: [
                            { q: "What does doping do to silicon?", options: ["Makes it transparent", "Changes its electrical properties by adding impurities", "Makes it heavier", "Changes its color"], answer: 1 },
                            { q: "Which element is commonly used for N-Type doping?", options: ["Boron", "Oxygen", "Phosphorus", "Carbon"], answer: 2 },
                            { q: "What is a 'hole' in P-Type silicon?", options: ["A physical hole in the material", "An empty space acting as a positive charge carrier", "A manufacturing defect", "A type of electron"], answer: 1 },
                            { q: "What happens at a P-N junction under forward bias?", options: ["No current flows", "Current flows through the junction", "The silicon melts", "The junction breaks"], answer: 1 }
                        ]
                    }
                ]
            },

            // ----- SEMICONDUCTORS MODULES 2-6 (SKELETON STRUCTURE) -----
            {
                id: "semi-m2",
                title: "Transistors: The Building Blocks of Chips",
                titleES: "Transistores: Los Bloques de Construcción de Chips",
                icon: "fa-solid fa-cubes",
                readings: [
                    {
                        id: "semi-m2-r1",
                        title: "From Diodes to Transistors: The MOSFET",
                        duration: "10 min",
                        content: `
# From Diodes to Transistors: The MOSFET

The **transistor** is the most important invention of the 20th century. Every digital device — from smartphones to supercomputers — works because of transistors. In this reading, you'll learn how a transistor works and why the MOSFET is the most important type.

## What Is a Transistor?

A **transistor** is an electronic component that can act as both a **switch** and an **amplifier**. As a switch, it can be either ON (conducting electricity) or OFF (blocking electricity). This ON/OFF behavior is the basis of all digital computing — every 1 and 0 in your computer is represented by a transistor that is either on or off.

## The MOSFET

The **MOSFET** (Metal-Oxide-Semiconductor Field-Effect Transistor) is the most widely used type of transistor. Billions of MOSFETs are manufactured every day.

A MOSFET has three terminals:
- **Gate**: Controls whether the transistor is ON or OFF (like a light switch)
- **Source**: Where current enters the transistor
- **Drain**: Where current exits the transistor

### How It Works:

Between the source and drain, there is a **channel** made of semiconductor material. When no voltage is applied to the gate, the channel does not conduct — the transistor is **OFF**.

When you apply a voltage to the gate, an **electric field** forms through the thin oxide layer. This field attracts charge carriers into the channel, creating a conductive path between source and drain — the transistor is **ON**.

The "Metal-Oxide-Semiconductor" in the name refers to the structure:
- **Metal** (or polysilicon) gate electrode
- **Oxide** insulating layer (typically silicon dioxide, SiO₂)
- **Semiconductor** channel (silicon)

## Types of MOSFETs:

| Type | Channel | Turns ON when... |
|------|---------|-----------------|
| **NMOS** | N-Type | Positive voltage at gate |
| **PMOS** | P-Type | Negative voltage at gate |

### CMOS — Complementary MOS

Modern chips use **CMOS** technology, which combines both NMOS and PMOS transistors on the same chip. CMOS is used because:
- Very **low power consumption** (uses power only when switching)
- **High noise immunity** (resistant to electrical interference)
- **Scalable** — can be made very small

Almost every processor, memory chip, and digital circuit made today uses CMOS.

## Moore's Law and Scaling

In 1965, Intel co-founder **Gordon Moore** predicted that the number of transistors on a chip would **double approximately every two years** while the cost per transistor would decrease. This prediction, known as **Moore's Law**, has held true for over 50 years.

| Year | Process Node | Transistors (typical CPU) |
|------|-------------|--------------------------|
| 2000 | 180 nm | ~42 million |
| 2010 | 32 nm | ~1.2 billion |
| 2020 | 7 nm | ~10 billion |
| 2025 | 3 nm | ~50+ billion |

The "nm" (nanometer) refers to the **process node** — roughly the size of the smallest features on the chip. For reference, a human hair is about 80,000 nm wide.

## FinFET: The Modern Transistor

As transistors got smaller than ~20 nm, the traditional flat (planar) MOSFET design stopped working well. Electrons would **leak** through the thin channel even when the transistor was supposed to be OFF.

The solution was the **FinFET** (Fin Field-Effect Transistor), invented by Chenming Hu at UC Berkeley. Instead of a flat channel, the FinFET has a **vertical fin** of silicon that the gate wraps around on three sides. This gives the gate much better control over the channel, reducing leakage.

**Key benefits of FinFET**:
- **Lower leakage current** (less wasted power)
- **Faster switching speed**
- **Better performance at smaller sizes**
- Used in all modern processors (Apple A-series, Intel Core, AMD Ryzen, Qualcomm Snapdragon)

## What's Next: GAA (Gate-All-Around)

The next evolution beyond FinFET is the **GAA transistor** (Gate-All-Around), where the gate completely surrounds the channel on **all four sides**. Samsung and Intel are beginning to use GAA in their latest manufacturing processes (2nm and below).

---

> **Key Takeaway**: Transistors are switches that form the basis of all computing. The MOSFET is the most common type, and FinFET is the modern 3D version used in today's most advanced chips.
`,
                        vocabulary: [
                            { en: "Transistor", es: "Transistor", definition: "An electronic switch/amplifier — the building block of all chips" },
                            { en: "MOSFET", es: "MOSFET", definition: "Metal-Oxide-Semiconductor Field-Effect Transistor — the most common type" },
                            { en: "Gate", es: "Compuerta", definition: "The terminal that controls ON/OFF state in a transistor" },
                            { en: "Source", es: "Fuente", definition: "Where current enters a transistor" },
                            { en: "Drain", es: "Drenaje", definition: "Where current exits a transistor" },
                            { en: "Channel", es: "Canal", definition: "The conductive path between source and drain" },
                            { en: "CMOS", es: "CMOS", definition: "Complementary MOS — technology using both NMOS and PMOS" },
                            { en: "Moore's Law", es: "Ley de Moore", definition: "Transistor count doubles roughly every two years" },
                            { en: "Process Node", es: "Nodo de Proceso", definition: "The size of smallest features on a chip (measured in nm)" },
                            { en: "FinFET", es: "FinFET", definition: "3D transistor with a vertical fin for better gate control" },
                            { en: "GAA", es: "GAA (Compuerta Envolvente)", definition: "Gate-All-Around — next-gen transistor with gate on all sides" },
                            { en: "Leakage Current", es: "Corriente de Fuga", definition: "Unwanted current flow when a transistor should be OFF" }
                        ],
                        questions: [
                            { q: "What are the three terminals of a MOSFET?", options: ["Input, Output, Power", "Gate, Source, Drain", "Anode, Cathode, Base", "Positive, Negative, Ground"], answer: 1 },
                            { q: "What does CMOS combine?", options: ["Two types of cables", "NMOS and PMOS transistors", "Copper and silicon", "Digital and analog signals"], answer: 1 },
                            { q: "Why was FinFET invented?", options: ["To make chips cheaper", "To reduce leakage current at small sizes", "To use less silicon", "To make transistors bigger"], answer: 1 },
                            { q: "According to Moore's Law, transistor count doubles every:", options: ["6 months", "1 year", "~2 years", "10 years"], answer: 2 }
                        ]
                    }
                ]
            },

            // Remaining semiconductor modules as skeletons with titles
            {
                id: "semi-m3",
                title: "Photolithography: Printing Circuits with Light",
                titleES: "Fotolitografía: Imprimiendo Circuitos con Luz",
                icon: "fa-solid fa-sun",
                readings: [
                    {
                        id: "semi-m3-r1",
                        title: "How Photolithography Works",
                        duration: "10 min",
                        content: `
# How Photolithography Works

**Photolithography** (fotolitografía) is the process of using light to transfer geometric patterns from a photomask to a light-sensitive chemical called a **photoresist** on the wafer. It is like printing a photograph, but on a microscopic scale. This is the key step that defines the size of the transistors on a chip.

## The Step-by-Step Lithography Process

To build a pattern on the silicon wafer, engineers follow these steps:

1. **Surface Preparation & Cleaning**: The wafer is cleaned chemically to remove contaminants, and dehydrated at high temperatures.
2. **Photoresist Coating (Recubrimiento de fotorresistencia)**: A liquid photoresist is applied to the wafer. The wafer is spun at high speed (1000 to 5000 RPM) to spread the chemical into a uniform, microscopically thin layer. This is called **spin coating**.
3. **Soft Bake (Pre-horneado)**: The wafer is heated gently to evaporate the solvents and solidify the photoresist.
4. **Alignment and UV Exposure (Alineación y exposición)**: A high-precision machine aligns a **photomask** (a template containing the circuit pattern) over the wafer. **Ultraviolet (UV) light** is projected through the mask, hitting the photoresist in specific areas.
5. **Development (Revelado)**: The wafer is rinsed with a developer solution. Depending on the type of photoresist, the exposed or unexposed parts dissolve:
   - **Positive Photoresist**: The areas exposed to light become soluble and dissolve. The unexposed areas remain. (This is the most common type used).
   - **Negative Photoresist**: The areas exposed to light become insoluble and remain. The unexposed areas dissolve.
6. **Hard Bake (Horneado final)**: The wafer is baked again to harden the remaining photoresist pattern before etching or doping begins.

## The Importance of Alignment: Overlay Accuracy

A modern microchip contains up to 80 separate layers. Each layer must align perfectly with the layers below it. The precision of this alignment is called **overlay accuracy** (precisión de superposición). If a layer is misaligned by even a fraction of a nanometer, the entire chip will fail.

> **Analogy**: Imagine drawing 80 different layers of a house on separate sheets of clear paper. If you don't stack them perfectly, the doors won't line up with the walls, and the roof will float in the air.
`,
                        vocabulary: [
                            { en: "Photoresist", es: "Fotorresistencia / Resina fotosensible", definition: "A light-sensitive chemical polymer coated on the wafer" },
                            { en: "Photomask", es: "Fotomáscara / Retícula", definition: "A glass plate with metal patterns used to block UV light" },
                            { en: "UV Exposure", es: "Exposición ultravioleta", definition: "Shining UV light through a mask onto a photoresist" },
                            { en: "Development", es: "Revelado", definition: "Rinsing the wafer in chemical developer to reveal the pattern" },
                            { en: "Spin Coating", es: "Recubrimiento por centrifugado", definition: "Method to apply liquid photoresist uniformly by spinning the wafer" },
                            { en: "Overlay Accuracy", es: "Precisión de superposición", definition: "How precisely layers of a chip align on top of each other" }
                        ],
                        questions: [
                            { q: "What does positive photoresist do when exposed to UV light?", options: ["It becomes soluble and dissolves in developer", "It becomes harder and insoluble", "It changes color to yellow", "It converts into pure silicon"], answer: 0 },
                            { q: "What is the purpose of spin coating?", options: ["To clean the wafer from dust", "To spread liquid photoresist into a uniform, thin layer", "To cut the wafer into chips", "To bake the wafer at high speed"], answer: 1 },
                            { q: "Which term refers to the alignment precision between different chip layers?", options: ["Wavelength accuracy", "Spin coating accuracy", "Overlay accuracy", "Chemical solubility"], answer: 2 },
                            { q: "What is a photomask?", options: ["A protective cover worn by fab workers", "A tool to measure wafer thickness", "A template plate containing the circuit pattern", "A type of chemical developer"], answer: 2 }
                        ]
                    },
                    {
                        id: "semi-m3-r2",
                        title: "EUV: Extreme Ultraviolet Lithography",
                        duration: "10 min",
                        content: `
# EUV: Extreme Ultraviolet Lithography

As transistors shrunk below 10 nanometers, traditional ultraviolet light (with a wavelength of 193 nm) became too thick to print such small features. To continue scaling down, the industry developed **EUV (Extreme Ultraviolet) lithography** (litografía ultravioleta extrema).

## The Physics of EUV

EUV light has a wavelength of only **13.5 nanometers** (nanómetros). This extremely short wavelength allows engineers to print features as small as 2 or 3 nanometers. However, working with EUV light is incredibly difficult because of its physical properties:

1. **Air Absorbs EUV**: EUV light is absorbed by almost all matter, including air. Therefore, the entire lithography machine must operate under a high **vacuum** (vacío).
2. **Glass Lenses Don't Work**: Traditional glass lenses absorb EUV light instead of bending it. Instead, EUV machines use high-precision **reflective mirrors** (espejos reflectores) coated with alternating layers of silicon and molybdenum to guide the light.
3. **Generating the Light**: To create EUV light, a high-power CO₂ laser fires 50,000 times per second at tiny falling droplets of molten **tin** (estaño). The laser blasts the tin into a hot **plasma** that emits 13.5 nm light.

## ASML: The Monopoly

EUV technology is so complex that only one company in the world is capable of manufacturing EUV lithography machines: **ASML**, based in Veldhoven, Netherlands.

A single ASML EUV machine:
- Contains over 100,000 parts and 3,000 cables.
- Costs between **$150 million and $350 million USD** depending on the model (e.g., High-NA EUV).
- Requires 4 Boeing 747 cargo planes to ship to a fab.
- Requires dozens of specialized engineers to install and maintain.

Without ASML's EUV machines, companies like TSMC, Samsung, and Intel could not manufacture the 3-nanometer and 2-nanometer chips that power today's leading smartphones, AI servers, and graphics processors.
`,
                        vocabulary: [
                            { en: "EUV Lithography", es: "Litografía ultravioleta extrema", definition: "Next-gen lithography using 13.5nm wavelength light" },
                            { en: "Wavelength", es: "Longitud de onda", definition: "The distance between successive crests of a wave of light" },
                            { en: "Vacuum", es: "Vacío", definition: "A space entirely devoid of matter/air" },
                            { en: "Reflective Mirror", es: "Espejo reflector", definition: "Ultra-smooth mirror used to redirect light instead of lenses" },
                            { en: "Tin", es: "Estaño", definition: "Metal melted and vaporized by laser to produce EUV light" },
                            { en: "High-NA EUV", es: "EUV de alta apertura numérica", definition: "Advanced EUV systems using larger angles to print smaller sizes" }
                        ],
                        questions: [
                            { q: "What is the wavelength of Extreme Ultraviolet (EUV) light?", options: ["193 nm", "13.5 nm", "3 nm", "1.2 nm"], answer: 1 },
                            { q: "Why must EUV systems operate under a vacuum?", options: ["To prevent the silicon from burning", "Because air molecules absorb EUV light", "To cool down the lasers", "To speed up the spin coating"], answer: 1 },
                            { q: "What does the ASML EUV system use instead of traditional glass lenses?", options: ["Fiber optic cables", "Prisms made of quartz", "Highly reflective mirrors", "Water droplets"], answer: 2 },
                            { q: "Which company is the sole manufacturer of EUV lithography systems?", options: ["TSMC", "ASML", "Intel", "NVIDIA"], answer: 1 }
                        ]
                    }
                ]
            },
            {
                id: "semi-m4",
                title: "Etching, Deposition, and Clean Rooms",
                titleES: "Grabado, Deposición y Salas Limpias",
                icon: "fa-solid fa-flask",
                readings: [
                    {
                        id: "semi-m4-r1",
                        title: "The Clean Room Environment",
                        duration: "10 min",
                        content: `
# The Clean Room Environment

A semiconductor fabrication plant (fab) is home to the **cleanroom** (sala limpia) — one of the cleanest environments on Earth. In a cleanroom, the air is filtered constantly to control the concentration of airborne particles, temperature, humidity, and vibration.

## Why Cleanrooms Are Crucial

A modern transistor is thousands of times smaller than a grain of sand. A single microscopic dust particle, hair, or skin cell landing on a wafer can block light during photolithography, short-circuit metal lines, or cause a transistor to fail. 

The industry measures cleanliness using classes:
- **Class 100**: Less than 100 particles (larger than 0.5 microns) per cubic foot of air.
- **Class 10**: Less than 10 particles per cubic foot.
- **Class 1 (Fab Floor)**: Less than 1 particle per cubic foot. (For comparison, normal outdoor air contains about 35 million particles per cubic foot!).

## The Gown Room and Gowning Protocol

Humans are the biggest source of contamination in a fab. Skin flakes, hair, dust from clothes, and sweat are constantly shedding. To enter the cleanroom, workers must follow a strict **gowning protocol** in the **gown room** (sala de vestimenta):

1. **Shoe Cleaning**: Workers pass through shoe scrubbers and put on shoe covers.
2. **Hair & Face Coverings**: Wearing a hairnet and face mask.
3. **Bunny Suit (Traje especial)**: A full-body, anti-static suit that covers the worker from head to toe.
4. **Booties & Gloves**: Wearing specialized non-dusting boots and double-layer nitrile gloves.
5. **Air Shower (Ducha de aire)**: Before walking through the cleanroom doors, workers stand in an air shower cabinet that blows high-velocity filtered air to strip away any remaining dust from the outside of their bunny suits.

Workers also use specialized **cleanroom paper** and non-shedding pens. Traditional pencils are banned because graphite flakes contaminate the air.
`,
                        vocabulary: [
                            { en: "Cleanroom", es: "Sala limpia / Cuarto limpio", definition: "A controlled room with extremely low levels of dust and pollutants" },
                            { en: "Gown Room", es: "Sala de vestimenta", definition: "The locker area where workers put on protective suits" },
                            { en: "Bunny Suit", es: "Traje de sala limpia / Traje protector", definition: "The full-body suit worn to prevent human contamination" },
                            { en: "Air Shower", es: "Ducha de aire", definition: "Chamber that blows air to remove particles from clothing before entry" },
                            { en: "Contamination", es: "Contaminación", definition: "Unwanted particles that damage wafer circuits" },
                            { en: "Gowning Protocol", es: "Protocolo de vestimenta", definition: "The strict sequence of steps to dress in cleanroom gear" }
                        ],
                        questions: [
                            { q: "Why are cleanrooms necessary in semiconductor fabrication?", options: ["To prevent workers from getting sick", "Because a single dust particle can destroy microscopically small features", "To save electrical energy", "To protect wafers from daylight"], answer: 1 },
                            { q: "Which area do workers use to put on bunny suits and prepare for cleanroom entry?", options: ["The control center", "The gown room", "The cafeteria", "The chemical bath"], answer: 1 },
                            { q: "What is the function of the air shower?", options: ["To wash bunny suits with soap and water", "To blow high-velocity filtered air to remove dust particles from suits", "To measure the humidity of the fab", "To sterilize the silicon wafers"], answer: 1 },
                            { q: "Compared to normal outdoor air, Class 1 cleanroom air is about:", options: ["10 times cleaner", "1,000 times cleaner", "35 million times cleaner", "Exactly the same"], answer: 2 }
                        ]
                    },
                    {
                        id: "semi-m4-r2",
                        title: "Etching and Thin Film Deposition",
                        duration: "10 min",
                        content: `
# Etching and Thin Film Deposition

Once a circuit pattern has been printed onto the photoresist by photolithography, the wafer undergoes two key manufacturing phases to build the 3D structures: **Etching** (grabado) and **Deposition** (deposición).

## Etching: Removing Material

**Etching** is the process of removing unwanted materials from the wafer. The remaining photoresist acts as a shield, protecting the materials underneath. There are two primary types of etching:

### 1. Wet Etching (Grabado por vía húmeda)
The wafer is immersed in a liquid chemical bath (such as hydrofluoric acid). 
- **Pros**: Simple and cheap.
- **Cons**: It is **isotropic** (etched in all directions equally, creating curved edges). This makes it unsuitable for modern sub-10nm chips.

### 2. Dry Etching (Grabado por vía seca)
A machine uses reactive gas and **plasma** to bombard the wafer surface.
- **Pros**: It is **anisotropic** (etches only in a vertical direction, creating straight, sharp vertical walls). Essential for tiny, dense transistors.
- **Cons**: Complex, expensive, and can damage the crystal structure if not calibrated.

## Thin Film Deposition: Adding Material

To connect transistors and build insulating layers, engineers deposit thin films of conductors (metals) and insulators (dielectrics). The main methods are:

- **CVD (Chemical Vapor Deposition)**: Reactant gases mix in a chamber, causing a chemical reaction that deposits a solid film on the wafer. Used for insulating layers.
- **PVD (Physical Vapor Deposition / Sputtering)**: A physical process where gas ions bombard a metal target (like copper or aluminum), knocking atoms loose to coat the wafer. Used for metal connections.
- **ALD (Atomic Layer Deposition)**: Gases are introduced one at a time in self-limiting pulses. It builds the film **one atomic layer at a time**. ALD offers unmatched control over thickness and step coverage.

> **Overlaying layers**: These steps are repeated up to 80 times, layering oxides, metal lines, and silicon structures to build a complete microprocessor.
`,
                        vocabulary: [
                            { en: "Wet Etching", es: "Grabado en húmedo (químico)", definition: "Removing material using liquid chemicals" },
                            { en: "Dry Etching", es: "Grabado en seco (por plasma)", definition: "Removing material using reactive gases and plasma ions" },
                            { en: "Isotropic", es: "Isotrópico", definition: "Etching that occurs in all directions at the same rate" },
                            { en: "Anisotropic", es: "Anisotrópico", definition: "Etching that occurs in one preferred direction (typically vertical)" },
                            { en: "Chemical Vapor Deposition (CVD)", es: "Deposición química de vapor", definition: "Depositing materials through chemical reactions of gases" },
                            { en: "Physical Vapor Deposition (PVD)", es: "Deposición física de vapor", definition: "Coating wafer with metal by physically knocking atoms off a target" },
                            { en: "Atomic Layer Deposition (ALD)", es: "Deposición por capa atómica", definition: "Adding films one atomic layer at a time for maximum control" }
                        ],
                        questions: [
                            { q: "Why is dry etching preferred over wet etching for advanced node chips?", options: ["It is cheaper and faster", "It is anisotropic, creating straight vertical walls", "It uses liquid chemicals", "It cannot damage the crystal structure"], answer: 1 },
                            { q: "Which deposition method builds thin films one atomic layer at a time?", options: ["ALD", "CVD", "PVD", "Wet Etching"], answer: 0 },
                            { q: "What is PVD primarily used for in semiconductor manufacturing?", options: ["Developing positive photoresist", "Etching deep vertical channels", "Depositing metallic layers for electrical connections", "Purifying raw silicon crystals"], answer: 2 },
                            { q: "What does isotropic mean in etching?", options: ["Material is removed vertically only", "Material is removed in all directions equally", "No material is removed", "Only metals are removed"], answer: 1 }
                        ]
                    }
                ]
            },
            {
                id: "semi-m5",
                title: "Testing, Packaging, and Quality Control",
                titleES: "Pruebas, Empaquetado y Control de Calidad",
                icon: "fa-solid fa-vial",
                readings: [
                    {
                        id: "semi-m5-r1",
                        title: "Wafer Testing and Yield",
                        duration: "10 min",
                        content: `
# Wafer Testing and Yield

Before a silicon wafer is cut into individual chips, every single circuit must be tested. This phase is critical because manufacturing chips is imperfect, and defects are inevitable.

## Wafer Probe Testing

A machine called a **wafer prober** uses a probe card with thousands of microscopic needles to touch the electrical pads on each chip (called a **die**). It runs rapid electrical tests to verify if the logic, memory, and voltage levels are correct.

- **Sorting / Binning**: Chips that pass are marked as functional. In some cases, chips are classified into different "bins" based on their performance (e.g., speed, power consumption). A high-speed chip is sold as a premium processor, while a slower chip from the same wafer is sold at a lower price.
- **Ink Dotting / Digital Mapping**: Traditionally, defective chips were marked with a drop of black ink. Today, a computer generates a digital "wafer map" that records the coordinates of all failed dies.

## Yield: The Ultimate Metric

In semiconductor manufacturing, **yield** (rendimiento) is the most critical business metric. It represents the percentage of working chips produced compared to the maximum possible count.

$$\text{Yield} = \frac{\text{Number of functional dies}}{\text{Total dies on wafer}} \times 100\%$$

If a wafer contains 500 dies, and testing shows that 400 are functional, the yield is **80%**. A low yield (e.g., 20%) means the factory is wasting expensive materials and processing time, which can ruin a chip designer's profits.

## Statistical Process Control (SPC)

To maintain high yields, fabs use **SPC (Statistical Process Control)**. Sensors monitor thousands of parameters (such as temperature, gas flow, and pressure) in real-time. If a sensor's readings shift away from the statistical average, SPC charts alert engineers immediately. This allows them to stop the machines and fix issues before entire batches of wafers are ruined.
`,
                        vocabulary: [
                            { en: "Probe Testing", es: "Prueba con sonda / Testeo de obleas", definition: "Electrical testing of chips while still on the wafer" },
                            { en: "Die", es: "Pastilla / Chip individual", definition: "A single unpackaged square of silicon containing a circuit" },
                            { en: "Yield", es: "Rendimiento", definition: "The ratio of working chips to the total chips produced" },
                            { en: "Binning", es: "Clasificación de chips", definition: "Sorting chips into groups based on performance and speed" },
                            { en: "Wafer Map", es: "Mapa de oblea", definition: "A digital grid recording the layout and status of each die" },
                            { en: "Statistical Process Control (SPC)", es: "Control estadístico de procesos", definition: "Using statistical methods to monitor and control a production process" }
                        ],
                        questions: [
                            { q: "What does 'yield' measure in semiconductor manufacturing?", options: ["The weight of the silicon wafer", "The speed of the chip processing", "The percentage of functional working chips produced", "The quantity of gas used in etching"], answer: 2 },
                            { q: "What tool is used to run electrical tests on chips while they are still on the wafer?", options: ["A spin coater", "A wafer prober", "An ion implanter", "An air shower"], answer: 1 },
                            { q: "What is the primary purpose of 'binning'?", options: ["To throw failed chips in the trash", "To sort working chips into price/performance categories", "To pack wafers into shipping containers", "To wash the wafer between layers"], answer: 1 },
                            { q: "How is Statistical Process Control (SPC) used to maintain high yields?", options: ["By replacing human workers with robots", "By monitoring fab parameters in real-time to alert engineers of shifts", "By increasing the temperature of cleanrooms", "By using cheaper raw silicon"], answer: 1 }
                        ]
                    },
                    {
                        id: "semi-m5-r2",
                        title: "Chip Packaging and ISO 9001",
                        duration: "10 min",
                        content: `
# Chip Packaging and ISO 9001

A functional silicon die is extremely fragile. It is thinner than paper, sensitive to moisture, and can be destroyed by static electricity. To be useful, it must be enclosed in a protective shell — a process called **packaging** (empaquetado).

## The Three Roles of Packaging

1. **Environmental Protection**: Enclosing the die in a plastic, ceramic, or metal case to block dust, moisture, and impact.
2. **Electrical Connections**: Connecting the tiny microscopic pads on the die to larger pins or pads that can be soldered to a printed circuit board (PCB).
3. **Heat Dissipation**: Providing a path to pull heat away from the silicon core (often using metal heat spreaders).

## Packaging Techniques

As chips grew more advanced, packaging evolved:

### 1. Wire Bonding (Conexión por micro-alambres)
Microscopic gold or aluminum wires are welded from the die pads to the package leads. 
- **Pros**: Very cheap and reliable.
- **Cons**: Slow and limited bandwidth; not suitable for high-speed processors.

### 2. Flip-Chip
The die is flipped upside down, and small solder bumps on the chip surface connect directly to the package substrate. This allows for higher pin counts and shorter electrical paths.

### 3. BGA (Ball Grid Array)
Instead of pins, BGA packages use a grid of tiny **solder balls** (bolas de soldadura) on the bottom of the package. It provides high contact density and excellent thermal performance.

### 4. Advanced Packaging (2.5D/3D)
Combining multiple dies (like CPU cores and high-bandwidth memory, HBM) in a single package. TSMC's **CoWoS** (Chip-on-Wafer-on-Substrate) is an example of advanced packaging used for high-end AI chips.

## Quality Standards: ISO 9001 and Automotive Reliability

Chips used in cars (automotive grade) or planes (aerospace grade) must follow extreme quality standards. They must operate from -40°C to 125°C and survive vibrations for 15+ years. A failure in a phone is annoying; a failure in a car brake system is fatal. Fabs must comply with **ISO 9001** (general quality management) and **AEC-Q100** (automotive qualification standard) to sell to these safety-critical industries.
`,
                        vocabulary: [
                            { en: "Chip Packaging", es: "Empaquetado de chips / Encapsulado", definition: "Enclosing a silicon die in a protective container" },
                            { en: "Wire Bonding", es: "Conexión de micro-alambres", definition: "Connecting die to package leads using ultra-thin metal wires" },
                            { en: "Solder Ball", es: "Bola de soldadura", definition: "Tiny sphere of solder used to connect BGA packages to PCBs" },
                            { en: "BGA (Ball Grid Array)", es: "Matriz de rejilla de bolas", definition: "Package style using a grid of solder balls on the bottom" },
                            { en: "Heat Dissipation", es: "Disipación de calor", definition: "The process of transfering thermal energy away from the chip" },
                            { en: "Substrate", es: "Sustrato", definition: "The base material that holds the die and wiring in the package" }
                        ],
                        questions: [
                            { q: "What is the primary purpose of chip packaging?", options: ["To change the electrical voltage of the chip", "To protect the delicate silicon die and connect it to a circuit board", "To increase the transistor count", "To make chips look attractive"], answer: 1 },
                            { q: "Which packaging technique uses a grid of tiny solder balls on the bottom?", options: ["Wire Bonding", "Flip-Chip", "BGA (Ball Grid Array)", "Doping"], answer: 2 },
                            { q: "What is 'wire bonding'?", options: ["Welding micro-thin gold/aluminum wires from die pads to package leads", "Tying cables together inside the cleanroom", "Connecting wafers using copper bars", "Using lasers to glue the chip to glass"], answer: 0 },
                            { q: "Why do automotive grade chips require stricter certifications like AEC-Q100?", options: ["To make them cheaper for car buyers", "Because they experience extreme temperatures, vibrations, and failures can be fatal", "So they can connect to wireless networks", "To speed up their manufacturing time"], answer: 1 }
                        ]
                    }
                ]
            },
            {
                id: "semi-m6",
                title: "The Global Chip Industry and Nearshoring",
                titleES: "La Industria Global de Chips y Nearshoring",
                icon: "fa-solid fa-globe",
                readings: [
                    {
                        id: "semi-m6-r1",
                        title: "The Semiconductor Supply Chain",
                        duration: "10 min",
                        content: `
# The Semiconductor Supply Chain

The semiconductor supply chain is one of the most complex, expensive, and specialized networks in global economics. No single country contains all the resources, tools, and talent required to design and build advanced chips.

## Fabs vs. Fabless Design Houses

The industry is split into three business models:

1. **Fabless Companies (Sin fábrica)**: Companies that design chips but do not own manufacturing facilities. They focus on research and software.
   - **Examples**: Apple, NVIDIA, AMD, Qualcomm.
2. **Foundries (Fundidoras)**: Contract factories that manufacture chips designed by fabless companies. They do not design their own chips.
   - **Examples**: **TSMC** (Taiwan Semiconductor Manufacturing Company), GlobalFoundries.
3. **IDMs (Integrated Device Manufacturers)**: Companies that both design and manufacture their own chips.
   - **Examples**: Intel, Samsung, Texas Instruments.

TSMC is the absolute leader, manufacturing over **90%** of the world's most advanced processors.

## Nearshoring and the CHIPS Act

Because of geopolitical tensions and natural disasters, governments and corporations realized that having 90% of chip manufacturing in Taiwan is highly risky. The **US CHIPS Act** was passed to provide $52 billion in subsidies to build fabs inside North America.

This trend is driving **nearshoring** (relocalización de manufactura en regiones cercanas) to Mexico:
- **Design & Validation**: Fabs in Arizona (Intel, TSMC) are closely linked to design and testing hubs in Guadalajara and Monterrey.
- **OSAT (Outsourced Semiconductor Assembly and Test)**: Mexico is capturing investments in packaging and testing facilities in cities like Chihuahua, Mexicali, and Hermosillo.
- **Supply Chains**: Local manufacturers in Mexico supply critical gases, chemicals, and mechanical parts to fabs in the U.S. Southwest.
`,
                        vocabulary: [
                            { en: "Supply Chain", es: "Cadena de suministro", definition: "The sequence of processes involved in the production and distribution of a commodity" },
                            { en: "Foundry", es: "Fundidora de semiconductores", definition: "A factory that manufactures chips for other design companies" },
                            { en: "Fabless", es: "Sin fábrica", definition: "A business model where a company designs chips but outsources fabrication" },
                            { en: "IDM", es: "Fabricante de dispositivos integrados", definition: "A company that designs, manufactures, and sells its own chips" },
                            { en: "Nearshoring", es: "Nearshoring / Relocalización cercana", definition: "Moving manufacturing operations close to the primary market" },
                            { en: "CHIPS Act", es: "Ley de Chips (EE. UU.)", definition: "US federal law funding domestic semiconductor manufacturing and research" }
                        ],
                        questions: [
                            { q: "What is a 'fabless' semiconductor company?", options: ["A company that only sells raw silicon crystals", "A company that designs chips but outsources manufacturing to a foundry", "A factory that operates without using electricity", "A company that packages chips without testing them"], answer: 1 },
                            { q: "Which foundry company is the absolute world leader, manufacturing over 90% of advanced processors?", options: ["Intel", "Samsung", "TSMC", "ASML"], answer: 2 },
                            { q: "Why is nearshoring bringing semiconductor investment to Mexico?", options: ["Because silicon is only mined in Mexico", "To locate testing, packaging, and supply chains closer to North American fab hubs", "To replace U.S. design houses completely", "Because ASML is based in Mexico"], answer: 1 },
                            { q: "What is an IDM (Integrated Device Manufacturer)?", options: ["A company that designs, fabricates, and sells chips in-house", "A shipping firm that moves wafers", "A machine used in cleanrooms", "A brand of protective bunny suits"], answer: 0 }
                        ]
                    },
                    {
                        id: "semi-m6-r2",
                        title: "Careers in Semiconductor Manufacturing",
                        duration: "10 min",
                        content: `
# Careers in Semiconductor Manufacturing

The expansion of semiconductor factories in North America and the nearshoring boom in Mexico are creating thousands of high-paying technical jobs. You do not always need a PhD to work in a fab — there are many entry paths for technicians and specialists.

## Key Career Roles in a Fab

### 1. Manufacturing Specialist (Especialista en manufactura)
Manufacturing Specialists monitor production runs, handle materials, and manage the automated systems that move wafers through the fab. They are responsible for following gown room protocols, ensuring safety, and maximizing line yield.

### 2. Equipment Technician (Técnico de equipo)
Fabs use some of the most expensive machinery on Earth. Equipment Technicians perform preventive maintenance, calibrate sensors, and repair tools like ion implanters, gas chambers, and plasma etchers.

### 3. Process Engineer (Ingeniero de procesos)
Process Engineers optimize the chemical recipes for oxidation, etching, deposition, and lithography. Their goal is to reduce defects, decrease process time, and improve die yield.

### 4. Quality Control Technician (Técnico de calidad)
Quality Technicians apply Statistical Process Control (SPC) methods, monitor cleanroom contamination levels, inspect wafer samples under microscopes, and analyze test failures.

## The Power of English for Specific Purposes (ESP)

In a semiconductor fab, **English is the official language of operation**. All:
- Equipment screens, operating software, and machine command consoles are in English.
- Technical manuals, safety logs, and standard operating procedures (SOPs) are documented in English.
- Global communications between factories in Mexico, the U.S., Taiwan, and Germany happen in English.

Mastering the technical ESP vocabulary from this module is not just an academic exercise — it is a career-defining skill that separates entry-level workers from highly-paid global specialists.
`,
                        vocabulary: [
                            { en: "Manufacturing Specialist", es: "Especialista en manufactura", definition: "Role monitoring fab runs, handling wafers, and managing automated systems" },
                            { en: "Equipment Technician", es: "Técnico de equipo", definition: "Technician responsible for maintaining and repairing fab machinery" },
                            { en: "Process Engineer", es: "Ingeniero de procesos", definition: "Engineer optimizing chemical and physical manufacturing stages to improve yield" },
                            { en: "Quality Control", es: "Control de calidad", definition: "Monitoring and maintaining product standards using metrics like SPC" },
                            { en: "SOP", es: "Procedimiento operativo estándar", definition: "Standard Operating Procedure — detailed instructions for operations" },
                            { en: "Technical English", es: "Inglés técnico", definition: "English vocabulary and phrasing used for specific fields like engineering" }
                        ],
                        questions: [
                            { q: "Which role focuses on preventive maintenance and repair of fab machinery?", options: ["Process Engineer", "Equipment Technician", "Manufacturing Specialist", "Quality Control Technician"], answer: 1 },
                            { q: "Why is Technical English (ESP) critical in Mexican semiconductor facilities?", options: ["Because most workers are from England", "All manuals, equipment screens, and global operations are in English", "To write Spanish translations", "To communicate with local retail stores"], answer: 1 },
                            { q: "What does a Process Engineer do in a fab?", options: ["Maintains cleanroom building structures", "Optimizes chemical and physical recipes of fabrication stages to improve yield", "Sorts packages into shipping boxes", "Dresses employees in the gown room"], answer: 1 },
                            { q: "What is a Manufacturing Specialist responsible for?", options: ["Writing software for smartphone apps", "Designing circuit architectures", "Monitoring automated production runs, handling wafers, and following gown room protocols", "Operating laser drills"], answer: 2 }
                        ]
                    }
                ]
            }
        ]
    },

    // =========================================================================
    // TRACK 3: ELECTROMOBILITY (SKELETON ONLY)
    // =========================================================================
    "electromobility": {
        id: "electromobility",
        title: "Electromovilidad",
        titleEN: "Electromobility",
        level: "A2-B1",
        status: "skeleton",
        description: "English for electric vehicle engineering — battery technology, electric motors, charging infrastructure, and Mexico's EV manufacturing sector.",
        descriptionES: "Inglés para ingeniería de vehículos eléctricos — tecnología de baterías, motores eléctricos, infraestructura de carga y el sector de manufactura EV de México.",
        totalModules: 6,
        estimatedHours: 12,
        prerequisites: ["esp-foundation"],
        standard: "CONOCER EC-EV",
        modules: [
            { id: "ev-m1", title: "Introduction to Electric Vehicles", titleES: "Introducción a los Vehículos Eléctricos", icon: "fa-solid fa-car-battery", readings: [] },
            { id: "ev-m2", title: "Battery Technology: Lithium-Ion and Beyond", titleES: "Tecnología de Baterías: Litio-Ion y Más Allá", icon: "fa-solid fa-battery-full", readings: [] },
            { id: "ev-m3", title: "Electric Motors and Powertrains", titleES: "Motores Eléctricos y Trenes Motrices", icon: "fa-solid fa-gear", readings: [] },
            { id: "ev-m4", title: "Charging Infrastructure and Standards", titleES: "Infraestructura de Carga y Estándares", icon: "fa-solid fa-charging-station", readings: [] },
            { id: "ev-m5", title: "EV Manufacturing Process", titleES: "Proceso de Manufactura de VE", icon: "fa-solid fa-industry", readings: [] },
            { id: "ev-m6", title: "Mexico's EV Industry and Career Paths", titleES: "La Industria EV de México y Trayectorias Profesionales", icon: "fa-solid fa-road", readings: [] }
        ]
    },

    // =========================================================================
    // TRACK 4: IT & DIGITAL INNOVATION (SKELETON ONLY)
    // =========================================================================
    "it-innovation": {
        id: "it-innovation",
        title: "Tecnologías de la Información e Innovación Digital",
        titleEN: "Information Technology & Digital Innovation",
        level: "A2-B1",
        status: "skeleton",
        description: "English for IT professionals — cloud computing, software development, databases, DevOps, and digital transformation.",
        descriptionES: "Inglés para profesionales de TI — computación en la nube, desarrollo de software, bases de datos, DevOps y transformación digital.",
        totalModules: 6,
        estimatedHours: 12,
        prerequisites: ["esp-foundation"],
        standard: "CONOCER EC0982",
        modules: [
            { id: "it-m1", title: "Introduction to Information Technology", titleES: "Introducción a las Tecnologías de la Información", icon: "fa-solid fa-laptop-code", readings: [] },
            { id: "it-m2", title: "Cloud Computing: AWS, Azure, and GCP", titleES: "Computación en la Nube: AWS, Azure y GCP", icon: "fa-solid fa-cloud", readings: [] },
            { id: "it-m3", title: "Software Development Fundamentals", titleES: "Fundamentos de Desarrollo de Software", icon: "fa-solid fa-code", readings: [] },
            { id: "it-m4", title: "Databases and Data Management", titleES: "Bases de Datos y Gestión de Datos", icon: "fa-solid fa-database", readings: [] },
            { id: "it-m5", title: "DevOps and CI/CD Pipelines", titleES: "DevOps y Pipelines CI/CD", icon: "fa-solid fa-infinity", readings: [] },
            { id: "it-m6", title: "Digital Transformation and Industry 4.0", titleES: "Transformación Digital e Industria 4.0", icon: "fa-solid fa-robot", readings: [] }
        ]
    },

    // =========================================================================
    // TRACK 5: AEROSPACE MANUFACTURING (SKELETON ONLY)
    // =========================================================================
    "aerospace": {
        id: "aerospace",
        title: "Manufactura Aeronáutica",
        titleEN: "Aerospace Manufacturing",
        level: "A2-B1",
        status: "skeleton",
        description: "English for aerospace manufacturing — composite materials, precision machining, quality assurance, and Mexico's aerospace corridor.",
        descriptionES: "Inglés para manufactura aeronáutica — materiales compuestos, maquinado de precisión, aseguramiento de calidad y el corredor aeroespacial de México.",
        totalModules: 6,
        estimatedHours: 12,
        prerequisites: ["esp-foundation", "semiconductors"],
        standard: "AS9100",
        modules: [
            { id: "aero-m1", title: "Introduction to Aerospace Engineering", titleES: "Introducción a la Ingeniería Aeroespacial", icon: "fa-solid fa-plane-up", readings: [] },
            { id: "aero-m2", title: "Materials Science: Composites and Alloys", titleES: "Ciencia de Materiales: Compuestos y Aleaciones", icon: "fa-solid fa-atom", readings: [] },
            { id: "aero-m3", title: "Precision Machining and CNC", titleES: "Maquinado de Precisión y CNC", icon: "fa-solid fa-cogs", readings: [] },
            { id: "aero-m4", title: "Assembly and Integration", titleES: "Ensamblaje e Integración", icon: "fa-solid fa-puzzle-piece", readings: [] },
            { id: "aero-m5", title: "Quality Assurance and AS9100", titleES: "Aseguramiento de Calidad y AS9100", icon: "fa-solid fa-clipboard-check", readings: [] },
            { id: "aero-m6", title: "Mexico's Aerospace Corridor", titleES: "El Corredor Aeroespacial de México", icon: "fa-solid fa-map-location-dot", readings: [] }
        ]
    }
};

// Make available for import
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ESP_COURSES;
}
