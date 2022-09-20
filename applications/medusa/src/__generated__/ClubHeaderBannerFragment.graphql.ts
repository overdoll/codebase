/**
 * @generated SignedSource<<cc1146c257eff667798923fc5a86bc11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubHeaderBannerFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBannerFragment" | "ClubIconFragment">;
  readonly " $fragmentType": "ClubHeaderBannerFragment";
};
export type ClubHeaderBannerFragment$key = {
  readonly " $data"?: ClubHeaderBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubHeaderBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubHeaderBannerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubBannerFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "50ea294e7dfbe77369d2745399fc2820";

export default node;
