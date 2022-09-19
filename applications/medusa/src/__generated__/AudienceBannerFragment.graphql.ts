/**
 * @generated SignedSource<<e6c04d056b6493ffd0b29af2967511fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AudienceBannerFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "AudienceBannerFragment";
};
export type AudienceBannerFragment$key = {
  readonly " $data"?: AudienceBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AudienceBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudienceBannerFragment",
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "bannerMedia",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ThumbnailMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "a4548e42ec74cd148d34bf8a33b53294";

export default node;
