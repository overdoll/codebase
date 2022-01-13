/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ChangeClubThumbnailFragment = {
    readonly id: string;
    readonly thumbnail: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly " $refType": "ChangeClubThumbnailFragment";
};
export type ChangeClubThumbnailFragment$data = ChangeClubThumbnailFragment;
export type ChangeClubThumbnailFragment$key = {
    readonly " $data"?: ChangeClubThumbnailFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ChangeClubThumbnailFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeClubThumbnailFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};
(node as any).hash = '42341a3122c559ac006261f7de21add3';
export default node;
