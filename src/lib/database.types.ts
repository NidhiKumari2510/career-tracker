export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          job_title: string
          company_name: string
          location: string
          job_type: 'Internship' | 'Full-time'
          status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
          date_applied: string
          notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_title: string
          company_name: string
          location?: string
          job_type: 'Internship' | 'Full-time'
          status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
          date_applied: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_title?: string
          company_name?: string
          location?: string
          job_type?: 'Internship' | 'Full-time'
          status?: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
          date_applied?: string
          notes?: string
          created_at?: string
          updated_at?: string
        }
      }
      dsa_progress: {
        Row: {
          id: string
          topic_key: string
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          topic_key: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          topic_key?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
