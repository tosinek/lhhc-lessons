import {
  courseData as courseCapacity,
  ownData,
  partyData,
} from "../hooks.server";
import type { LayoutServerLoad } from "./$types";
import { allCourses } from "./[email]/courses";

const coursesWithCapacity = (registrationData) => {
  const coursesCopy = allCourses.map((obj) => ({ ...obj }));
  return coursesCopy.map((course) => {
    const re = new RegExp(course.number, "i");
    const cIndex = courseCapacity?.findIndex((c) => re.test(c[0]));
    if (cIndex !== -1) {
      course.leaders = courseCapacity[cIndex]?.[7];
      course.follows = courseCapacity[cIndex]?.[8];
      course.room = courseCapacity[cIndex]?.[6];
    }
    if (course.name === "Friday party" && courseCapacity?.[25]?.[6]) {
      course.room = courseCapacity[25][6];
    }
    if (course.name === "Saturday party" && courseCapacity?.[26]?.[6]) {
      course.room = courseCapacity[26][6];
    }

    if (registrationData) {
      const registrationIndex = registrationData?.findIndex((f) => re.test(f));
      const isRegistered = registrationIndex !== -1;
      course.isRegistered = isRegistered;

      const parts =
        isRegistered && registrationData[registrationIndex]?.split(" ");
      if (parts?.[parts.length - 1]?.toLowerCase() === "leader") {
        course.registeredAs = "leader";
      } else if (parts?.[parts.length - 1]?.toLowerCase() === "follower") {
        course.registeredAs = "follow";
      }

      // handle parties
      if (
        course.name === "Friday party" &&
        registrationData?.[2] === "Ano / Ja / Yes"
      ) {
        course.isRegistered = true;
      }

      if (
        course.name === "Saturday party" &&
        registrationData?.[8] === "Ano / Ja / Yes"
      ) {
        course.isRegistered = true;
      }
    }
    return course;
  });
};

export const load: LayoutServerLoad = async ({ url, params }) => {
  const personalRegistration = params?.email && ownData(params.email);
  if (params?.email) console.log("email", params.email);

  if (personalRegistration?.error) {
    return {
      error: personalRegistration.error,
    };
  }

  return {
    parties: partyData,
    courses: coursesWithCapacity(personalRegistration?.data),
    registration: params?.email ? ownData(params.email) : null,
  };
};
