"use client";

import { ChangeEvent, FocusEvent, FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { contactInfo } from "@/data";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

type FieldErrorMap = Partial<Record<string, string>>;

type FormValues = Record<string, string>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Contact = () => {
  const initialValues = useMemo<FormValues>(
    () =>
      contactInfo.form.fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {} as FormValues),
    []
  );

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrorMap>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const validateField = (name: string, value: string): string => {
    const field = contactInfo.form.fields.find((item) => item.name === name);
    if (!field) return "";

    if (field.required && !value.trim()) {
      return `${field.label} is required.`;
    }

    if (name === "name" && value.trim() && value.trim().length < 2) {
      return "Name should be at least 2 characters.";
    }

    if (field.type === "email" && value.trim() && !EMAIL_REGEX.test(value.trim())) {
      return "Please enter a valid email address.";
    }

    if (name === "message" && value.trim() && value.trim().length < 20) {
      return "Message should be at least 20 characters for better project context.";
    }

    return "";
  };

  const validateAll = (nextValues: FormValues) => {
    const nextErrors: FieldErrorMap = {};

    contactInfo.form.fields.forEach((field) => {
      const error = validateField(field.name, nextValues[field.name] || "");
      if (error) {
        nextErrors[field.name] = error;
      }
    });

    return nextErrors;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateAll(values);

    setTouched(
      contactInfo.form.fields.reduce((acc, field) => {
        acc[field.name] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage(contactInfo.form.messages.error);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatusMessage(contactInfo.form.messages.success);
      setValues(initialValues);
      setTouched({});
      setErrors({});
    } catch {
      setStatusMessage(contactInfo.form.messages.fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitLabel = contactInfo.form.submittingButton;

  return (
    <section
      id="contact"
      className="section-shell"
    >
      <div className="section-orb-top-left" />
      <div className="section-orb-bottom-right" />

      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="w-full max-w-6xl text-center mb-12 section-reveal"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-6 section-title">
          {contactInfo.cta.main.title}
        </h2>
        <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto section-subtitle">
          {contactInfo.cta.main.description}
        </p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
        <motion.div
          variants={slideInFromLeft(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="group space-card-purple p-6 md:p-8 hover:shadow-[0_0_24px_rgba(112,66,248,0.2)] interactive-surface"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold text-white mb-4 section-title">
              {contactInfo.cta.contact.title}
            </h3>
            <p className="text-gray-300 leading-relaxed section-subtitle mb-6">
              {contactInfo.cta.contact.description}
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center justify-between rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-gray-200 interactive-button hover:border-purple-400 hover:bg-purple-500/20"
              >
                <span className="text-sm text-gray-300">Email</span>
                <span className="font-medium">{contactInfo.email}</span>
              </a>

              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-between rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-gray-200 interactive-button hover:border-cyan-400 hover:bg-cyan-500/20"
              >
                <span className="text-sm text-gray-300">WhatsApp</span>
                <span className="font-medium">Chat Now</span>
              </a>

              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                className="flex items-center justify-between rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-gray-200 interactive-button hover:border-purple-400 hover:bg-purple-500/20"
              >
                <span className="text-sm text-gray-300">Phone</span>
                <span className="font-medium">{contactInfo.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form
          variants={slideInFromRight(0.25)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={handleSubmit}
          noValidate
          className="group space-card-cyan p-6 md:p-8 hover:shadow-[0_0_24px_rgba(45,212,191,0.2)] interactive-surface"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300" />

          <div className="relative z-10 space-y-5">
            {contactInfo.form.fields.map((field) => {
              const hasError = Boolean(errors[field.name] && touched[field.name]);
              const inputId = `contact-${field.name}`;
              const errorId = `${inputId}-error`;

              return (
                <div key={field.name}>
                  <label
                    htmlFor={inputId}
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    {field.label}
                    {field.required ? " *" : ""}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={inputId}
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      maxLength={1200}
                      placeholder={field.placeholder}
                      aria-invalid={hasError}
                      aria-describedby={hasError ? errorId : undefined}
                      className={`w-full rounded-lg border bg-[#0d0824]/80 px-4 py-3 text-gray-100 placeholder:text-gray-500 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                        hasError
                          ? "border-red-400/80 focus-visible:ring-red-400/70"
                          : "border-cyan-500/30 focus-visible:ring-cyan-400/60"
                      }`}
                    />
                  ) : (
                    <input
                      id={inputId}
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      autoComplete={field.type === "email" ? "email" : "on"}
                      aria-invalid={hasError}
                      aria-describedby={hasError ? errorId : undefined}
                      className={`w-full rounded-lg border bg-[#0d0824]/80 px-4 py-3 text-gray-100 placeholder:text-gray-500 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${
                        hasError
                          ? "border-red-400/80 focus-visible:ring-red-400/70"
                          : "border-cyan-500/30 focus-visible:ring-cyan-400/60"
                      }`}
                    />
                  )}

                  <div className="mt-1 min-h-[20px] text-xs">
                    {hasError ? (
                      <p id={errorId} className="text-red-300">
                        {errors[field.name]}
                      </p>
                    ) : field.name === "message" ? (
                      <p className="text-gray-500 text-right">
                        {(values.message || "").length}/1200
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}

            <div className="min-h-[24px]">
              {statusMessage ? (
                <p
                  className={`text-sm ${
                    statusMessage === contactInfo.form.messages.success
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {statusMessage}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full button-primary interactive-button rounded-lg py-3 px-6 text-white font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? submitLabel : contactInfo.form.submitButton}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};
