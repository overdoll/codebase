/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AudienceTileOverlayFragment = {
    readonly title: string;
    readonly thumbnail: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    } | null;
    readonly " $refType": "AudienceTileOverlayFragment";
};
export type AudienceTileOverlayFragment$data = AudienceTileOverlayFragment;
export type AudienceTileOverlayFragment$key = {
    readonly " $data"?: AudienceTileOverlayFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AudienceTileOverlayFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudienceTileOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Audience",
  "abstractKey": null
};
(node as any).hash = '02009734a46d84b85a3fa233f10f9517';
export default node;
