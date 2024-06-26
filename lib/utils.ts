"use client"
import { useCallback, useState, useEffect } from "react";
// import { Question } from "@/models/question.model";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";
// import { any } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/// function to format likes or vote count for better display
export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};

/// FUNCTION to get time created who posted

export function useMemoizedTimestamp(createdAt: Date): string {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const now = new Date();
    const timeDifference = now.getTime() - createdAt?.getTime();

    // Define time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    // Logic to calculate time difference and format timestamp
    let formattedString;
    if (timeDifference < minute) {
      const seconds = Math.floor(timeDifference / 1000);
      formattedString = `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      formattedString = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      formattedString = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDifference < week) {
      const days = Math.floor(timeDifference / day);
      formattedString = `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDifference < month) {
      const weeks = Math.floor(timeDifference / week);
      formattedString = `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      formattedString = `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      const years = Math.floor(timeDifference / year);
      formattedString = `${years} ${years === 1 ? "year" : "years"} ago`;
    }

    setFormattedTime(formattedString);
  }, []); // Recalculate only if `createdAt` changes

  return formattedTime;
}

export const getJoinedDate = (date: Date): string => {
  // Extract the month and year from the Date object
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Create the joined date string (e.g., "September 2023")
  const joinedDate = `${month} ${year}`;

  return joinedDate;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

interface BadgeParam {
  criteria: { type: keyof typeof BADGE_CRITERIA; count: number }[];
}

export const assignBadges = (params: BadgeParam) => {
  // Initialize badgeCounts object to keep track of badge counts for each level
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  // Iterate over each criterion
  criteria.forEach((criterion) => {
    // Destructure type and count from the criterion
    const { type, count } = criterion;

    // Get badge levels and their corresponding thresholds from BADGE_CRITERIA
    const badgeLevels: any = BADGE_CRITERIA[type];

    // Iterate over each badge level
    Object.keys(badgeLevels).forEach((level: any) => {
      // Check if the count meets the threshold for the current badge level
      if (count >= badgeLevels[level]) {
        // Increment the count for the corresponding badge level in badgeCounts
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  // Return the badgeCounts object containing counts for each badge level
  return badgeCounts;
};
