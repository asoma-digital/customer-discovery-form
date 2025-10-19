export const ProgressBar = ({ currentStep, totalSteps }) => {
    const progress = ((currentStep + 1) / totalSteps) * 100;
    
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            background: '#f5f5f5',
            padding: '1rem',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
        }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#007bff',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginTop: '0.5rem'
                }}>
                    <span>Question {currentStep + 1} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
            </div>
        </div>
    );
};