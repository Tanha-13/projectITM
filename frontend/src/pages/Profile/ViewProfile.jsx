import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function ViewProfile({ profileData }) {
  console.log(profileData);
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {profileData && (
        <div className="max-w-4xl mx-auto">
          {user.gender === "female" ? (
            <img
              src="https://i.ibb.co.com/64xq7nF/women-profile.jpg"
              alt=""
              className="w-24 h-24 object-cover rounded-full mx-auto mt-10"
            />
          ) : (
            <img
              src="https://i.ibb.co.com/k3HGkck/profile-user.png"
              alt=""
              className="w-24 h-24 object-cover rounded-full"
            />
          )}

          <h1 className="mt-7 my-2 text-4xl text-center font-semibold">
            View Details
          </h1>
          <Table className="">
            <TableBody>
              <TableRow>
                <TableCell className="text-lg font-semibold">Name</TableCell>
                <TableCell className="text-base font-medium">{`${profileData.firstName} ${profileData.lastName}`}</TableCell>
              </TableRow>
              <TableRow className="bg-slate-100">
                <TableCell className="text-lg font-semibold">Email</TableCell>
                <TableCell className="text-base font-medium">
                  {profileData.email}
                </TableCell>
              </TableRow>

              {profileData.role === "admin" && (
                <TableRow className="">
                  <TableCell className="text-lg font-semibold">Role</TableCell>
                  <TableCell className="text-base font-medium">
                    {profileData.role}
                  </TableCell>
                </TableRow>
              )}
              {profileData.role === "student" ? (
                <>
                  <TableRow className="">
                    <TableCell className="text-lg font-semibold">
                      Student ID
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {profileData.studentId}
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-slate-100">
                    <TableCell className="text-lg font-semibold">
                      Academic Semester
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {profileData.semester}
                    </TableCell>
                  </TableRow>
                  <TableRow className="">
                    <TableCell className="text-lg font-semibold">
                      Batch No.
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {profileData.batch}
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  <TableRow className="">
                    <TableCell className="text-lg font-semibold">
                      Designation
                    </TableCell>
                    <TableCell className="text-base font-medium">
                      {profileData.designation}
                    </TableCell>
                  </TableRow>
                </>
              )}
              <TableRow className="bg-slate-100">
                <TableCell className="text-lg font-semibold">
                  Department
                </TableCell>
                <TableCell className="text-base font-medium">
                  {profileData.department}
                </TableCell>
              </TableRow>
              <TableRow className="">
                <TableCell className="text-lg font-semibold">Faculty</TableCell>
                <TableCell className="text-base font-medium">
                  {profileData.faculty}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ViewProfile;

ViewProfile.propTypes = {
  profileData: PropTypes.object,
};
