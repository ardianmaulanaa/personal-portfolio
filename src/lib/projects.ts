export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  type: string;
  role: string;
  tech: string[];
  description: string;
  overview: string;
  architecture: string;
  implementation: string;
  stats: ProjectStat[];
  accent: string;
  myRole: string[];
  images: string[];
  hoverImage: string;
  github: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    slug: "simukpbj",
    title: "SIMUKPBJ",
    type: "Government Procurement Monitoring System",
    role: "Full-Stack Developer",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Nginx",
      "JWT",
      "REST API",
    ],
    description:
      "A web-based dashboard for monitoring procurement workflows, HPS digitalization, vendor data, risk registers, and procurement documents.",
    overview:
      "SIMUKPBJ digitalizes procurement monitoring for a provincial health institution. The system brings planning, verification, RUP publication, purchasing progress, supporting documents, and management reporting into one structured workflow while keeping confidential procurement records out of the public portfolio.",
    architecture:
      "The application uses a Next.js and TypeScript interface backed by PostgreSQL through Prisma. Role-aware routes and JWT-based access control separate operational responsibilities, while REST endpoints coordinate procurement records, workflow status, vendors, risks, and document metadata. Docker and Nginx support a repeatable deployment setup.",
    implementation:
      "The work focused on translating a multi-stage administrative process into clear application states, building maintainable database relations, validating user input, and presenting progress through operational dashboards. Public case-study content intentionally describes the engineering approach without exposing institutional records.",
    stats: [
      { value: "JWT", label: "Role-aware access" },
      { value: "Prisma", label: "Typed data layer" },
      { value: "Docker", label: "Deployment workflow" },
    ],
    accent: "#2456C4",
    myRole: [
      "Translated procurement stages and stakeholder requirements into trackable application workflows.",
      "Developed full-stack features with Next.js, TypeScript, Prisma, and PostgreSQL.",
      "Implemented role-aware access, validation, dashboard views, and REST API integration.",
      "Supported containerized deployment using Docker and Nginx.",
    ],
    images: [
      "/Projects/simukpbj/SIMUKPBJ-COVER-4.png",
      "/Projects/simukpbj/1.png",
    ],
    hoverImage: "/Projects/simukpbj/SIMUKPBJ-COVER-4.png",
    github:
      "https://github.com/ardianmaulanaa/monitoring_ukpbj_dinas_kesehatan",
    liveUrl: "https://www.simukpbj.my.id/",
  },
  {
    id: 2,
    slug: "faceattend",
    title: "FaceAttend",
    type: "Web-Based Employee Attendance System",
    role: "Software Development Intern",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Prisma",
      "GPS",
      "Photo Verification",
    ],
    description:
      "An employee attendance system with GPS-based check-in and check-out, photo verification, leave workflows, monitoring dashboards, and reporting.",
    overview:
      "FaceAttend was developed during an internship at CV. Mulya Kreatif Cipta for Creativemu and Alfabank. It supports day-to-day employee attendance through location-aware check-in and check-out, photo evidence, leave management, attendance history, administration, and operational reporting.",
    architecture:
      "The product uses a Next.js and TypeScript web application with reusable employee and administrator workflows. Server-side features connect attendance, user, schedule, leave, and report data, while browser geolocation and image capture provide contextual attendance evidence.",
    implementation:
      "Contributions covered frontend and backend development, database integration, API work, debugging, feature enhancement, testing, and deployment support. The project was driven by operational requirements and refined to improve usability and reliability across desktop and mobile use.",
    stats: [
      { value: "GPS", label: "Location-aware attendance" },
      { value: "Photo", label: "Check-in verification" },
      { value: "PWA", label: "Mobile-ready workflow" },
    ],
    accent: "#1D469F",
    myRole: [
      "Built and maintained employee attendance features during a software development internship.",
      "Contributed to GPS check-in and check-out, photo verification, leave, history, and reporting workflows.",
      "Integrated application data and APIs across employee and administrator interfaces.",
      "Supported debugging, testing, feature refinement, and deployment preparation.",
    ],
    images: [
      "/Projects/faceattend/creativemu-cover.png",
      "/Projects/faceattend/workflow.svg",
    ],
    hoverImage: "/Projects/faceattend/creativemu-cover.png",
    github:
      "https://github.com/ardianmaulanaa/Presensi-Web-Based-Employee-Creativemu",
    liveUrl: "https://absensi.creativemu.id/",
  },
  {
    id: 3,
    slug: "greenmarket",
    title: "GreenMarket",
    type: "Marketplace Web Application",
    role: "Full-Stack Developer",
    tech: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "REST API",
    ],
    description:
      "A marketplace application with authentication, seller and product management, cart features, database integration, and transaction flows.",
    overview:
      "GreenMarket is an eco-conscious marketplace project built to explore the complete flow of a commerce application. Users can authenticate, browse and manage products, use a cart, and move through a structured transaction workflow, while sellers manage their catalog through dedicated features.",
    architecture:
      "The project separates the Next.js frontend from backend application logic and persists relational marketplace data in PostgreSQL. The data model connects users, sellers, products, carts, and transactions, with API routes handling validation and business rules between each stage.",
    implementation:
      "The work included authentication, CRUD operations, request handling, database integration, product and seller management, cart logic, error handling, and the transaction flow. The project served as practical experience in coordinating user-facing interfaces with reliable backend behavior.",
    stats: [
      { value: "CRUD", label: "Product management" },
      { value: "SQL", label: "Relational data model" },
      { value: "REST", label: "Application API" },
    ],
    accent: "#93C5FD",
    myRole: [
      "Built full-stack marketplace features across the Next.js interface and backend services.",
      "Implemented authentication, product management, seller flows, carts, and transactions.",
      "Designed and integrated relational data using PostgreSQL and Prisma.",
      "Added validation and error handling around core marketplace requests.",
    ],
    images: [
      "/Projects/greenmarket/GM-COVER.png",
      "/Projects/greenmarket/2.png",
      "/Projects/greenmarket/3.png",
    ],
    hoverImage: "/Projects/greenmarket/GM-COVER.png",
    github: "https://github.com/ardianmaulanaa/GreenMarket-Website",
    liveUrl: "",
  },
  {
    id: 4,
    slug: "e-tilang",
    title: "E-Tilang: Wrong-Way Detection",
    type: "Computer Vision Prototype",
    role: "AI / Computer Vision Developer",
    tech: [
      "Python",
      "YOLOv8",
      "OpenCV",
      "Roboflow",
      "NumPy",
      "Computer Vision",
    ],
    description:
      "A computer vision prototype that detects and tracks vehicles moving against a configured one-way traffic direction.",
    overview:
      "E-Tilang explores automated wrong-way traffic detection from image and video streams. The prototype combines a trained object detector with vehicle tracking and directional logic so that movement can be evaluated against a configured traffic lane.",
    architecture:
      "YOLOv8 provides vehicle detections, OpenCV handles video frames and visualization, and centroid-based tracking associates detections across frames. A configurable virtual line and movement history are used to identify vehicles whose direction conflicts with the expected lane flow.",
    implementation:
      "The project covered dataset preparation and annotation, model training, validation, object detection, video processing, centroid tracking, and result visualization. Training artifacts are presented as recorded outputs rather than converted into unsupported performance claims.",
    stats: [
      { value: "YOLOv8", label: "Object detection" },
      { value: "OpenCV", label: "Video pipeline" },
      { value: "Tracking", label: "Direction analysis" },
    ],
    accent: "#183455",
    myRole: [
      "Prepared and annotated vehicle data for object-detection experiments.",
      "Trained and validated a YOLOv8 detector using the project dataset.",
      "Implemented OpenCV video processing and centroid-based vehicle tracking.",
      "Connected movement history to configurable wrong-way direction rules and visual output.",
    ],
    images: [
      "/Projects/etilang/promo.png",
      "/Projects/etilang/validation.jpg",
      "/Projects/etilang/results.png",
      "/Projects/etilang/confusion-matrix.png",
    ],
    hoverImage: "/Projects/etilang/promo.png",
    github: "https://github.com/ardianmaulanaa/ComputerVision-Etilang-One-Way",
    liveUrl: "",
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
