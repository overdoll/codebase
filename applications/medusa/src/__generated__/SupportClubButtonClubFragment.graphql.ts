/**
 * @generated SignedSource<<6c113e8c4ddbb31c6e67cef8304512e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubButtonClubFragment$data = {
  readonly canSupport: boolean;
  readonly slug: string;
  readonly viewerIsOwner: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubModalFragment" | "SupportClubPriceButtonFragment">;
  readonly " $fragmentType": "SupportClubButtonClubFragment";
};
export type SupportClubButtonClubFragment$key = {
  readonly " $data"?: SupportClubButtonClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubButtonClubFragment",
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
      "name": "canSupport",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubPriceButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubModalFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "d4631030bdd0ff1e7aab25490072a6a6";

export default node;
