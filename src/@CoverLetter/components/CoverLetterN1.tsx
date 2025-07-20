import {CoverLetterResponseType} from "@/types/coverLetter/CoverLetterType";

const CoverLetterN1 = ({data}: { data: CoverLetterResponseType }) => {
    return (
        <div
            style={{
                fontFamily: "'Inter', sans-serif",
                color: '#333',
                lineHeight: 1.6,
                background: '#fafafa',
                margin: 0,
                padding: '2rem',
            }}
        >
            <article
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr',
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(90deg, #f0f0f0 0px, #f0f0f0 2px, transparent 2px, transparent 4px)',
                    }}
                />
                <div style={{padding: '2rem'}}>
                    <header>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                color: '#222',
                            }}
                        >
                            {data.firstname + ' ' + data.lastname}
                        </h1>
                        <p
                            style={{
                                margin: '0 0 1.5rem',
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: '#666',
                            }}
                        >
                            {data.jobTitle}
                        </p>
                    </header>

                    <section>
                        <p
                            style={{
                                margin: '0 0 .75rem',
                                fontSize: '1.125rem',
                                fontWeight: 500,
                            }}
                        >
                            {data.managerName}
                        </p>
                        <p>
                            {data.letterDetails}
                        </p>
                    </section>

                    <footer style={{marginTop: '1.5rem'}}>
                        <p
                            style={{
                                margin: 0,
                                fontWeight: 600,
                                marginBottom: '.25rem',
                            }}
                        >
                            {data.firstname + " " + data.lastname}
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '2rem',
                                color: 'yellow',
                                fontSize: '.95rem',
                            }}
                        >
              <span
                  style={{
                      width: '.75rem',
                      height: '.75rem',
                      borderRadius: '50%',
                      marginRight: '.5rem',
                      backgroundColor: 'red',
                      display: 'inline-block',
                  }}
              />
                            {data.email}
                        </div>
                    </footer>
                </div>
            </article>
        </div>
    );
}

export default CoverLetterN1;