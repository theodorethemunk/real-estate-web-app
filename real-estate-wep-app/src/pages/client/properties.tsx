import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { COMPANY_PRIMARY_DOMAIN_URL } from '../../repo/datarepo'

export default function MyPropertiesPage(_props: any) {
  const [myProperties, setMyProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    const { data } = await supabase
      .from('properties')
      .select('*, property_images(*), agents(*)')
      .order('created_at', { ascending: false })
    if (data) setMyProperties(data)
    setLoading(false)
  }

  return (
    <div className="dashboard-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="space30"></div>
            <div className="dashboad-all-details-section">
              <h3>My Properties</h3>
              <div className="row">
                <div className="space28"></div>
                <h4 className="found">
                  {loading ? "Fetching your properties..." 
                    : myProperties.length == 1 
                      ? "Showing " + myProperties.length + " property" 
                      : "Showing " + myProperties.length + " properties"}
                </h4>
                <div className="space20"></div>
                <div className="table-container">
                  <div className="table-header">
                    <div>Properties</div>
                    <div className="d-none d-md-block">Status</div>
                    <div className="d-none d-md-block">Purchase Date</div>
                  </div>
                  {loading
                    ? Array(3).fill(0).map((_, i) => (
                        <div className="table-row" key={i}>
                          <div className="listing">
                            <div className="shimmer-box shimmer-image-small" style={{ marginRight: 20 }}></div>
                            <div className="details">
                              <div className="shimmer-box shimmer-text"></div>
                              <div className="space5"></div>
                              <div className="shimmer-box shimmer-btn"></div>
                            </div>
                          </div>
                          <div className="status">
                            <div className="shimmer-box shimmer-btn"></div>
                          </div>
                          <div className="actions">
                            <div className="shimmer-box shimmer-text"></div>
                          </div>
                        </div>
                      ))
                    : myProperties.length < 1
                      ? <div className="text-center p-4">
                          <div className="space30"></div>
                          <p className="fw-bold">You own no properties</p>
                          <div className="space10"></div>
                          <a href="/listing" className="btn btn-dark">Shop Now</a>
                        </div>
                      : myProperties.map((history) => (
                        <div className="table-row" key={history.id}>
                          <div className="listing">
                            <img src={
                              history.imageFilePath
                                ? history.imageFilePath.startsWith('/uploads')
                                  ? `${COMPANY_PRIMARY_DOMAIN_URL}${history.imageFilePath}`
                                  : history.imageFilePath
                                : '/client/img/property-placeholder-image.png'
                            } alt={history.name} />
                            <div className="details">
                              <a href="#">{history.name}</a>
                              <div className="space5"></div>
                              <a className="price">Current Price: ₦ {history.propertyPrice?.toLocaleString()}</a>
                            </div>
                          </div>
                          <div className="status">
                            <a href="#" className="status-badge approved">OWNED</a>
                          </div>
                          <div className="actions">
                            <h5 className="edit">{history.updatedOn ?? ""}</h5>
                          </div>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}