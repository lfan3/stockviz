from .cleaning_strategies import CleaningStrategy


class DataCleaner:
    def __init__(self, strategy: CleaningStrategy):
        self._strategy = strategy

    def clean(self, data, rowManager) -> dict:
        return self._strategy.execute(data, rowManager)

    """with this getter and setter, the CleaningStrategy can be interchangable"""

    @property
    def strategy(self) -> CleaningStrategy:
        return self.__strategy

    @strategy.setter
    def strategy(self, newStrategy: CleaningStrategy) -> None:
        self.__strategy = newStrategy
