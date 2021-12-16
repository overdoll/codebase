/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type useUpdateCharacterFragment = {
    readonly id: string;
    readonly " $refType": "useUpdateCharacterFragment";
};
export type useUpdateCharacterFragment$data = useUpdateCharacterFragment;
export type useUpdateCharacterFragment$key = {
    readonly " $data"?: useUpdateCharacterFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"useUpdateCharacterFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateCharacterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'c8cb89c751837604bd9afa7ba591bca6';
export default node;
