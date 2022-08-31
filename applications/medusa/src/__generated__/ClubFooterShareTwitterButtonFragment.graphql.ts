/**
 * @generated SignedSource<<b23564c7e991238a2b591c9ce7584ff4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubFooterShareTwitterButtonFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ClubFooterShareTwitterButtonFragment";
};
export type ClubFooterShareTwitterButtonFragment$key = {
  readonly " $data"?: ClubFooterShareTwitterButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterShareTwitterButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubFooterShareTwitterButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "cdeac7721616bac29475dcfb7deaa425";

export default node;
