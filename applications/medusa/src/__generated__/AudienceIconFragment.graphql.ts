/**
 * @generated SignedSource<<8eb15c773ab146e00e248e368b3a60fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AudienceIconFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"IconMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "AudienceIconFragment";
};
export type AudienceIconFragment$key = {
  readonly " $data"?: AudienceIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AudienceIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudienceIconFragment",
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
          "name": "IconMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "ac05ce628eb2bc8739da2cae530f2ddd";

export default node;
