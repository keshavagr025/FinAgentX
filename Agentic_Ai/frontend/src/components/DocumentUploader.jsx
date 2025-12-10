import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, X, AlertCircle, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const DocumentUploader = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: 'PAN Card.pdf', type: 'pan', size: '1.2 MB', status: 'verified', uploadedAt: '2024-01-15' },
    { id: 2, name: 'Aadhaar Card.pdf', type: 'aadhaar', size: '2.1 MB', status: 'pending', uploadedAt: '2024-01-15' },
    { id: 3, name: 'Bank Statement Jan.pdf', type: 'bank', size: '3.5 MB', status: 'processing', uploadedAt: '2024-01-14' },
    { id: 4, name: 'Salary Slip Dec.pdf', type: 'salary', size: '0.8 MB', status: 'verified', uploadedAt: '2024-01-14' },
  ])
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    setUploading(true)
    
    // Simulate upload
    setTimeout(() => {
      const newDocs = acceptedFiles.map((file, index) => ({
        id: documents.length + index + 1,
        name: file.name,
        type: getFileType(file.name),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'pending',
        uploadedAt: new Date().toLocaleDateString()
      }))
      
      setDocuments(prev => [...prev, ...newDocs])
      setUploading(false)
      toast.success(`${acceptedFiles.length} file(s) uploaded successfully`)
    }, 2000)
  }, [documents.length])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const getFileType = (fileName) => {
    const lowerName = fileName.toLowerCase()
    if (lowerName.includes('pan')) return 'pan'
    if (lowerName.includes('aadhaar')) return 'aadhaar'
    if (lowerName.includes('bank') || lowerName.includes('statement')) return 'bank'
    if (lowerName.includes('salary') || lowerName.includes('payslip')) return 'salary'
    if (lowerName.includes('address')) return 'address'
    return 'other'
  }

  const getStatusColor = (status) => {
    const colors = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      rejected: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle size={16} className="text-green-500" />
      case 'rejected': return <X size={16} className="text-red-500" />
      case 'processing': return <Loader2 size={16} className="text-blue-500 animate-spin" />
      default: return <AlertCircle size={16} className="text-yellow-500" />
    }
  }

  const getDocumentIcon = (type) => {
    const icons = {
      pan: '📋',
      aadhaar: '🆔',
      bank: '🏦',
      salary: '💰',
      address: '🏠',
      other: '📄'
    }
    return icons[type] || '📄'
  }

  const handleRemove = (id) => {
    setDocuments(docs => docs.filter(doc => doc.id !== id))
    toast.success('Document removed')
  }

  const requiredDocuments = [
    { type: 'pan', label: 'PAN Card', required: true, description: 'For identity verification' },
    { type: 'aadhaar', label: 'Aadhaar Card', required: true, description: 'For address verification' },
    { type: 'bank', label: 'Bank Statements (6 months)', required: true, description: 'For income assessment' },
    { type: 'salary', label: 'Salary Slips (3 months)', required: true, description: 'For employment proof' },
    { type: 'address', label: 'Address Proof', required: true, description: 'Utility bill or rental agreement' },
    { type: 'photo', label: 'Passport Photo', required: false, description: 'Recent photograph' },
  ]

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="text-blue-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {isDragActive ? 'Drop files here' : 'Upload Documents'}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag & drop your files here or click to browse. Max file size: 10MB
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: PDF, JPG, PNG
          </p>
          {uploading && (
            <div className="mt-4">
              <Loader2 className="animate-spin mx-auto text-blue-600" size={24} />
              <p className="text-sm text-gray-500 mt-2">Uploading...</p>
            </div>
          )}
        </div>
      </div>

      {/* Required Documents */}
      <div className="card">
        <h3 className="font-semibold text-lg mb-4">Required Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requiredDocuments.map((doc, index) => {
            const uploadedDoc = documents.find(d => d.type === doc.type)
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all ${
                  uploadedDoc ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{getDocumentIcon(doc.type)}</span>
                  <div className="flex items-center space-x-2">
                    {uploadedDoc ? (
                      <>
                        <CheckCircle size={20} className="text-green-500" />
                        <span className="text-xs text-green-600">Uploaded</span>
                      </>
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                    )}
                  </div>
                </div>
                <h4 className="font-medium mb-1">{doc.label}</h4>
                <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${doc.required ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                    {doc.required ? 'Required' : 'Optional'}
                  </span>
                  {uploadedDoc && (
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(uploadedDoc.status)}`}>
                      {uploadedDoc.status}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-lg">Uploaded Documents</h3>
            <p className="text-gray-600 text-sm">Processed by AI agents</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
            {documents.length} files
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3">Document</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Size</th>
                <th className="text-left p-3">Uploaded</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <FileText size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {getDocumentIcon(doc.type)} {doc.type.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">
                      {doc.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <span className="mr-2">{getStatusIcon(doc.status)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">{doc.size}</td>
                  <td className="p-3 text-gray-600">{doc.uploadedAt}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
                        View
                      </button>
                      <button 
                        onClick={() => handleRemove(doc.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DocumentUploader