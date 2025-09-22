"use client";
import { useAuthorsCtx } from "@/contexts/AuthorsProvider";
export default function useAuthors() { return useAuthorsCtx(); }
