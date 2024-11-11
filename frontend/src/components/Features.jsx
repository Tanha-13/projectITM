import { FaProjectDiagram,FaTasks, FaLock,FaUserCheck } from "react-icons/fa";

const features = [
    {
      name: 'Assignment & Tracking',
      description:
        'Easily assign projects to students and monitor their progress in real time, ensuring milestones are met and providing transparency across all stages of the project journey.',
      icon: FaProjectDiagram,
    },
    {
      name: 'Task Management',
      description:
        'Organize tasks, set priorities, and track completion to stay on top of every detail, keeping projects streamlined and on schedule.',
      icon: FaTasks,
    },
    {
      name: 'Secure Access',
      description:
        'Protect sensitive information with robust security measures, ensuring only authorized users can access and manage project data.',
      icon: FaLock,
    },
    {
      name: 'Role-Based Dashboards',
      description:
        'Provide personalized dashboards for students, supervisors, and admins, displaying relevant information and tools specific to each role for an optimized experience.',
      icon: FaUserCheck,
    },
  ]

function Features() {
  return (
    <div className="p-4 md:p-14">
        <div className="container mx-auto">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-3xl xl:text-5xl text-center font-semibold text-gray-900 my-6 lg:my-10 xl:my-14">
          Core Functionalities to Enhance Project Workflow
          </p>
        </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 xl:grid-cols-4 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16 xl:my-4">
                <div className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[linear-gradient(to_bottom,_#094074,_#246953)]">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-xl">{feature.name}</div>
                </div>
                <div className="mt-2 text-base/7 text-gray-600">{feature.description}</div>
              </div>
            ))}
          </dl>
        </div>
    </div>
  )
}

export default Features