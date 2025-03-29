from markdown_pdf import MarkdownPdf, Section

def convert_md_to_pdf(md_file_path, pdf_file_path):
    # Create PDF object with table of contents up to level 2
    pdf = MarkdownPdf(toc_level=2)
    
    # Read markdown content
    with open(md_file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Ensure the first heading starts with a single #
    # Add a level-1 heading if none exists
    if not content.startswith('# '):
        content = '# Document\n\n' + content
    
    # Add content as a section
    pdf.add_section(Section(content))
    
    # Save the PDF
    pdf.save(pdf_file_path)

# Convert the file
md_file_path = 'Project_0010/Presentation.md'
pdf_file_path = 'Project_0010/Presentation.pdf'  # Removed leading slash

convert_md_to_pdf(md_file_path, pdf_file_path)

# # Convert the file
# md_file_path = 'Programming_in_C/First_Semester/Lectures_Till_Loops.md'
# pdf_file_path = 'Programming_in_C/First_Semester/Lectures_Till_Loops.pdf'

# convert_md_to_pdf(md_file_path, pdf_file_path)