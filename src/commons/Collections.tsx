
export default class Collection<T> {
    collection: T[]
    length: number

    constructor(collection: T[]) {
        this.collection = collection.slice()
        this.length = collection.length
    }

    static from<T>(...values: T[]): Collection<T | any> {
        return new Collection(values)
    }

    static wrap<T>(collection: T[]): Collection<T | any> {
        return new Collection(collection)
    }

    static empty<T>(): Collection<T | any> {
        return new Collection<T>([])
    }

    isEmpty(): boolean {
        return this.collection.length === 0
    }

    nonEmpty(): boolean {
        return !this.isEmpty()
    }

    map<R>(func: (value: T, index: number) => R): Collection<R> {
        return new Collection(this.collection.map(func))
    }

    foreach(func: (value: T, index: number) => void): void {
        this.collection.forEach(func)
    }

    flatten<R>(): Collection<R> {
        const flattened = this.collection.map(item => {
            if (item instanceof Collection) {
                return item.collection
            } else {
                return item
            }
        }).flat()
        return new Collection(flattened)
    }

    flatMap<R>(func: (value: T, index: number) => Collection<R>): Collection<R> {
        return this.map(func).flatten()
    }

    filter(func: (value: T) => boolean): Collection<T> {
        return new Collection(this.collection.filter(func))
    }

    count(func: (value: T) => boolean): number {
        return this.filter(func).length
    }

    slice(start?: number, end?: number): Collection<T> {
        return new Collection(this.collection.slice(start, end))
    }

    take(quantity: number): Collection<T> {
        return this.slice(0, quantity)
    }

    drop(quantity: number): Collection<T> {
        return this.slice(quantity)
    }

    concatWith(other: T[]): Collection<T> {
        return new Collection(this.collection.concat(other))
    }

    concat(other: Collection<T>): Collection<T> {
        return this.concatWith(other.collection)
    }

    add(value: T): Collection<T> {
        return this.concatWith([value])
    }
    
    replace(index: number, newValue: T): Collection<T> {
        return this.map( (value, i) => i === index ? newValue : value )
    }

    remove(index: number): Collection<T> {
        return this.take(index).concat(this.drop(index + 1))
    }

    any(func: (value: T, index?: number) => boolean): boolean {
        return this.collection.some(func)
    }

    all(func: (value: T, index?: number) => boolean): boolean {
        return this.collection.every(func)
    }

    get(index: number): T | undefined {
        return this.collection[index]
    }

    head(): T | undefined {
        return this.get(0)
    }

    last(): T | undefined {
        return this.collection[this.length - 1]
    }

    random(): T | undefined {
        const random = Math.floor(Math.random() * this.length)

        return (this.get(random))
    }

    shuffle(): Collection<T> {
        const aux = this.slice().collection

        for (var i = this.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = aux[i];
            aux[i] = aux[j];
            aux[j] = temp;
        }

        return Collection.wrap(aux)
    }

    tail(): Collection<T> {
        return this.drop(1)
    }

    sortBy(compareFunc?: (a: T, b: T) => number): Collection<T> {
        return new Collection(this.collection.slice().sort(compareFunc))
    }

    find(func: (value: T, index?: number) => boolean): T | undefined {
        return this.collection.find(func)
    }

    findIndex(func: (value: T, index?: number) => boolean): number | undefined {
        const index = this.collection.findIndex(func)
        return index >= 0 ? index : undefined
    }

    foldLeft<A>(func: (seed: A, elem: T) => A, seed: A): A {
        if (this.isEmpty()) {
            return seed
        } else {
            return this.tail().foldLeft(func, func(seed, this.head()!))
        }
    }

    makeString(separator?: string, defaultValue?: string): string {
        return (
            this.isEmpty() ?
                defaultValue ?? '' :
                this.tail().foldLeft(
                    (seed, elem) => seed + (separator ?? '') + elem,
                    this.head() + ''
                )
        )
    }
}