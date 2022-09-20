/**
 * @generated SignedSource<<cd676cd4a2368fecef02119cab437e64>>
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
    readonly " $fragmentSpreads": FragmentRefs<"BannerMediaFragment">;
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
          "name": "BannerMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "47bbaba4d2ba32157501c067b94948fd";

export default node;
