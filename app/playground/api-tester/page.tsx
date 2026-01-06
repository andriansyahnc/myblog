'use client'

import { useState } from 'react'
import Link from '@/components/Link'
import axios from 'axios'

interface Header {
  key: string
  value: string
  enabled: boolean
}

interface FormDataItem {
  key: string
  value: string
  enabled: boolean
}

type BodyType = 'none' | 'json' | 'form-data' | 'x-www-form-urlencoded' | 'raw'

interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: unknown
}

export default function ApiTester() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1')
  const [method, setMethod] = useState('GET')
  const [headers, setHeaders] = useState<Header[]>([
    { key: 'Content-Type', value: 'application/json', enabled: true },
  ])
  const [bodyType, setBodyType] = useState<BodyType>('json')
  const [jsonBody, setJsonBody] = useState('')
  const [rawBody, setRawBody] = useState('')
  const [formData, setFormData] = useState<FormDataItem[]>([{ key: '', value: '', enabled: true }])
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [responseTime, setResponseTime] = useState<number | null>(null)

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }])
  }

  const updateHeader = (
    index: number,
    field: 'key' | 'value' | 'enabled',
    value: string | boolean
  ) => {
    const newHeaders = [...headers]
    if (field === 'enabled') {
      newHeaders[index][field] = value as boolean
    } else {
      newHeaders[index][field] = value as string
    }
    setHeaders(newHeaders)
  }

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index))
  }

  const addFormDataItem = () => {
    setFormData([...formData, { key: '', value: '', enabled: true }])
  }

  const updateFormDataItem = (
    index: number,
    field: 'key' | 'value' | 'enabled',
    value: string | boolean
  ) => {
    const newFormData = [...formData]
    if (field === 'enabled') {
      newFormData[index][field] = value as boolean
    } else {
      newFormData[index][field] = value as string
    }
    setFormData(newFormData)
  }

  const removeFormDataItem = (index: number) => {
    setFormData(formData.filter((_, i) => i !== index))
  }

  const updateBodyTypeHeaders = (type: BodyType) => {
    setBodyType(type)
    const contentTypeIndex = headers.findIndex((h) => h.key.toLowerCase() === 'content-type')
    const newHeaders = [...headers]

    const contentTypeMap: Record<BodyType, string> = {
      none: '',
      json: 'application/json',
      'form-data': 'multipart/form-data',
      'x-www-form-urlencoded': 'application/x-www-form-urlencoded',
      raw: 'text/plain',
    }

    if (contentTypeIndex !== -1 && type !== 'none') {
      newHeaders[contentTypeIndex].value = contentTypeMap[type]
    } else if (type !== 'none') {
      newHeaders.unshift({ key: 'Content-Type', value: contentTypeMap[type], enabled: true })
    }

    setHeaders(newHeaders)
  }

  const sendRequest = async () => {
    try {
      setLoading(true)
      setError('')
      setResponse(null)
      setResponseTime(null)

      const startTime = performance.now()

      const headersObj: Record<string, string> = {}
      headers.forEach((h) => {
        if (h.enabled && h.key) {
          headersObj[h.key] = h.value
        }
      })

      const config: {
        method: string
        url: string
        headers: Record<string, string>
        data?: unknown
      } = {
        method: method.toLowerCase(),
        url,
        headers: headersObj,
      }

      if (['POST', 'PUT', 'PATCH'].includes(method) && bodyType !== 'none') {
        if (bodyType === 'json') {
          try {
            config.data = JSON.parse(jsonBody)
          } catch {
            throw new Error('Invalid JSON in body')
          }
        } else if (bodyType === 'form-data') {
          const formDataObj = new FormData()
          formData.forEach((item) => {
            if (item.enabled && item.key) {
              formDataObj.append(item.key, item.value)
            }
          })
          config.data = formDataObj
        } else if (bodyType === 'x-www-form-urlencoded') {
          const params = new URLSearchParams()
          formData.forEach((item) => {
            if (item.enabled && item.key) {
              params.append(item.key, item.value)
            }
          })
          config.data = params.toString()
        } else if (bodyType === 'raw') {
          config.data = rawBody
        }
      }

      const res = await axios(config)
      const endTime = performance.now()

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data,
      })
      setResponseTime(Math.round(endTime - startTime))
    } catch (err) {
      const error = err as {
        response?: {
          status: number
          statusText: string
          headers: Record<string, string>
          data: unknown
        }
        message?: string
      }
      setError((error.response?.data as string) || error.message || 'Request failed')
      if (error.response) {
        setResponse({
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers,
          data: error.response.data,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            API Tester
          </h1>
          <Link
            href="/playground"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← Back to Playground
          </Link>
        </div>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Test HTTP requests and explore APIs - A lightweight Postman alternative
        </p>
      </div>

      <div className="py-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Request</h2>

            <div className="flex gap-2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>PATCH</option>
                <option>DELETE</option>
              </select>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                onClick={sendRequest}
                disabled={loading || !url}
                className="rounded-md bg-primary-500 px-6 py-2 font-semibold text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Headers</h3>
                <button
                  onClick={addHeader}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  + Add Header
                </button>
              </div>
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={header.enabled}
                    onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    value={header.key}
                    onChange={(e) => updateHeader(index, 'key', e.target.value)}
                    placeholder="Key"
                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    value={header.value}
                    onChange={(e) => updateHeader(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  />
                  <button
                    onClick={() => removeHeader(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {['POST', 'PUT', 'PATCH'].includes(method) && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Body</h3>

                <div className="flex gap-2 border-b border-gray-300 dark:border-gray-600">
                  {(
                    ['none', 'json', 'form-data', 'x-www-form-urlencoded', 'raw'] as BodyType[]
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => updateBodyTypeHeaders(type)}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${
                        bodyType === type
                          ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                      }`}
                    >
                      {type === 'x-www-form-urlencoded' ? 'form-urlencoded' : type}
                    </button>
                  ))}
                </div>

                {bodyType === 'none' && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This request does not have a body
                  </p>
                )}

                {bodyType === 'json' && (
                  <textarea
                    value={jsonBody}
                    onChange={(e) => setJsonBody(e.target.value)}
                    placeholder='{"key": "value"}'
                    rows={8}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  />
                )}

                {(bodyType === 'form-data' || bodyType === 'x-www-form-urlencoded') && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {bodyType === 'form-data' ? 'Form Data' : 'URL Encoded'}
                      </span>
                      <button
                        onClick={addFormDataItem}
                        className="text-sm text-primary-500 hover:text-primary-600"
                      >
                        + Add Field
                      </button>
                    </div>
                    {formData.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={item.enabled}
                          onChange={(e) => updateFormDataItem(index, 'enabled', e.target.checked)}
                          className="h-5 w-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                        />
                        <input
                          type="text"
                          value={item.key}
                          onChange={(e) => updateFormDataItem(index, 'key', e.target.value)}
                          placeholder="Key"
                          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                        />
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => updateFormDataItem(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                        />
                        <button
                          onClick={() => removeFormDataItem(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {bodyType === 'raw' && (
                  <textarea
                    value={rawBody}
                    onChange={(e) => setRawBody(e.target.value)}
                    placeholder="Enter raw text"
                    rows={8}
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                  />
                )}
              </div>
            )}
          </div>

          {(response || error) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Response</h2>
                {responseTime !== null && (
                  <span className="text-sm text-gray-500">Time: {responseTime}ms</span>
                )}
              </div>

              {error && !response && (
                <div className="rounded-md border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                  <p className="font-semibold">Error</p>
                  <p className="mt-1 font-mono text-sm">{error}</p>
                </div>
              )}

              {response && (
                <>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-3 py-1 font-semibold ${
                        response.status >= 200 && response.status < 300
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                    >
                      {response.status} {response.statusText}
                    </span>
                  </div>

                  <details className="rounded-md border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50">
                    <summary className="cursor-pointer px-4 py-2 font-semibold text-gray-900 dark:text-gray-100">
                      Response Headers
                    </summary>
                    <pre className="overflow-auto border-t border-gray-300 bg-white p-4 text-sm dark:border-gray-600 dark:bg-gray-900">
                      {JSON.stringify(response.headers, null, 2)}
                    </pre>
                  </details>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Body</h3>
                    <pre className="overflow-auto rounded-md border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100">
                      {typeof response.data === 'object'
                        ? JSON.stringify(response.data, null, 2)
                        : response.data}
                    </pre>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
