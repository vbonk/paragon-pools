"use client";

import { useState, type FormEvent } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactContent } from "@/content/pages/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Client-side validation
    const newErrors: FormErrors = {};
    if (!data.name?.trim()) newErrors.name = "Name is required";
    if (!data.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = "Invalid email address";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (body.errors) {
          setErrors(body.errors);
          setStatus("idle");
          return;
        }
        throw new Error(body.error || "Failed to submit");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
        <h3 className="text-xl font-semibold text-green-900 mb-2">
          Thank You!
        </h3>
        <p className="text-green-800">
          We&apos;ve received your message and will be in touch within 1 business
          day.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="text"
        name="_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0 h-0 w-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="Full Name *"
          placeholder="John Smith"
          error={errors.name}
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email *"
          placeholder="john@example.com"
          error={errors.email}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Phone"
          placeholder="(651) 555-0123"
          error={errors.phone}
        />
        <div className="space-y-1">
          <label htmlFor="interest" className="block text-sm font-medium text-foreground">
            I&apos;m Interested In
          </label>
          <select
            id="interest"
            name="interest"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
          >
            <option value="">Select an option...</option>
            {contactContent.formFields.interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="timeline" className="block text-sm font-medium text-foreground">
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
        >
          <option value="">When are you looking to start?</option>
          {contactContent.formFields.timelines.map((timeline) => (
            <option key={timeline} value={timeline}>
              {timeline}
            </option>
          ))}
        </select>
      </div>

      <Textarea
        id="message"
        name="message"
        label="Message"
        placeholder="Tell us about your project..."
        error={errors.message}
        rows={5}
      />

      <input type="hidden" name="sourcePage" value="contact" />

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or call us at (651) 653-6807.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
