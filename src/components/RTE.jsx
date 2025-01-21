import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    // <Editor
                    //     apiKey="pcggqnv8pj6emhr57j73fqzxo8bodaa8csr3qgwrcygkv6rd" // Replace this with your actual API key
                    //     tinymceScriptSrc="https://cdn.tiny.cloud/1/your-api-key-here/tinymce/7/tinymce.min.js"
                    //     initialValue={defaultValue}

                    //     init={{
                    //         height: 500,
                    //         menubar: true,
                    //         plugins: [
                    //             "image",
                    //             "advlist",
                    //             "autolink",
                    //             "lists",
                    //             "link",
                    //             "image",
                    //             "charmap",
                    //             "preview",
                    //             "anchor",
                    //             "searchreplace",
                    //             "visualblocks",
                    //             "code",
                    //             "fullscreen",
                    //             "insertdatetime",
                    //             "media",
                    //             "table",
                    //             "code",
                    //             "help",
                    //             "wordcount",
                    //             "anchor",
                    //         ],
                    //         toolbar:
                    //             "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                    //         content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    //     }}
                    //     onEditorChange={onChange}
                    // />
                    <Editor
                        apiKey='pcggqnv8pj6emhr57j73fqzxo8bodaa8csr3qgwrcygkv6rd'
                        onEditorChange={onChange}
                        init={{
                            plugins: [
                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',

                                'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                            ],
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                        }}
                        initialValue="Welcome to TinyMCE!"
                    />
                )}
            />
        </div>
    );
}
