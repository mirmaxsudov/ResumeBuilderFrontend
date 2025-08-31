import React from 'react'
import { Card, CardContent } from '@/components/dashboard/ui/card'
import { Button } from '@/components/dashboard/ui/button'
import { Search, RefreshCw, Filter } from 'lucide-react'

interface NotFoundProps {
  onRefresh?: () => void;
  onClearFilters?: () => void;
  hasFilters?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ 
  onRefresh, 
  onClearFilters, 
  hasFilters = false 
}) => {
  return (
    <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
      <CardContent className="flex flex-col items-center justify-center text-center py-16 px-6">
        <div className="mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Filter className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mb-8">
          <h3 className="text-xl font-semibold text-gray-900">
            {hasFilters ? 'No roles match your filters' : 'No roles found'}
          </h3>
          <p className="text-gray-600 max-w-md">
            {hasFilters 
              ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
              : 'It looks like there are no roles available at the moment.'
            }
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {onRefresh && (
            <Button
              onClick={onRefresh}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          )}
          
          {hasFilters && onClearFilters && (
            <Button
              onClick={onClearFilters}
              variant="default"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Filter className="w-4 h-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {!hasFilters && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-md">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> If you believe this is an error, 
              try refreshing the page or contact support.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default NotFound
