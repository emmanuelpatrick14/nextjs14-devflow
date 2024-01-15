"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";
import React, {  useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

// Import dotenv to load environment variables from a .env file
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validation";
import { Badge } from "../ui/badge";
import Image from "next/image";

const type:any = "dit"

const QuestionForm = () => {

    //state to handle submit action
    const [isSubmitting, setIsSubmitting ] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    // Do something with the form values.
    setIsSubmitting(true)

    try {
        ///make async call

        //contain all form data

        //navigate back home
    } catch (error) {
        
    }finally{

    }
    console.log(values);
  }

//handle for tags on Enter press
 function handleInputKeyDown(e:React.KeyboardEvent<HTMLInputElement>,field:any){

    if(e.key === "Enter" && field.name === 'tags' ){
        e.preventDefault();
      
      
        //gettingthe input
        const tagInput = e.target as HTMLInputElement;
        const tagValue = tagInput.value.trim(); 

        if(tagValue !== ''){
            if(tagValue.length > 15){

             return form.setError('tags',{
                type: "required",
                message:"Tag must be less than 15 characters."
             })   

            }
            //ensure we dont add duplicat tags

            if(!field.value.includes(tagValue as never)){
                form.setValue('tags',[...field.value,tagValue])
                tagInput.value = ''
                form.clearErrors('tags');
            }else{
                form.trigger();
            }
        }

    }




}


    // delete tag functionality

    function handleTagRemove(tag:string,field:any){

        const newTags = field.value.filter((t:string)=> t !== tag)

        form.setValue('tags', newTags)


    }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10 "
      >
        {/* //question title field  */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 ">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regulat mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* explanation field  */}
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full gap-3 flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800 ">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5  background-light900_dark300">
                {/* add a Todo and editor comp ===TINY MCE*/}
                <Editor  //work on the styling darkmode and env====================================\\\\\\\\\\\\\
                  apiKey="ecnx6s6i8wporc6dj3jl8ermzcqpojvg9g6iei7jh34ymi3w"
                //   {process.env.TINYMCE_EDITOR_API_KEY}
                  init={{
                    plugins:
                      "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
                    toolbar:
                      "undo redo  | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    tinycomments_author: "Author name",
                    mergetags_list: [
                      { value: "First.Name", title: "First Name" },
                      { value: "Email", title: "Email" },
                    ],

                    ai_request: (request:string, respondWith:any) =>
                      respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                  }}
                  initialValue=""
                
                />
                {/* ); */}
              </FormControl>
              <FormDescription className="body-regulat mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the titles.
                Minumum 20 characters
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* Tag field  */}
      
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    // disabled={type === "Edit"}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          onClick={() =>
                               handleTagRemove(tag, field)
                          }
                        >
                          {tag}
                          {
                            <Image
                              src="/assets/icons/close.svg"
                              alt="Close icon"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          }
                        </Badge>
                      ))}
                    </div>
                  )}
                </>

              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
            {/* //button tosubmit/edit form  */}
                <Button  type="submit" className="primary-gradient w-fit !text-light-900" disabled={isSubmitting}>
                        {
                            isSubmitting ? (
                                <>
                                {type === 'edit' ? "Editing...": "Posting..."}
                                </>
                            ):(
                                
                                <>
                                {type === 'edit' ? "Edit Question": "Ask a Question"}
                                </> 
                            )
                        }
                </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;